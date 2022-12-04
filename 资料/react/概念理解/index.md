## 概念

1.  `任务插队`：当低优先级的任务正在执行，突然插入一个高优先级的任务，那么会中断低优先级的任务，先执行高优先级的任务。
    - js 没有执行函数就中断的机制，那么是在什么插入优先级的任务。
2.  `任务饥饿问题`：当低优先级的任务一直被源源不断的高优先级的任务打断，那么低优先级的任务一直得不到执行，就是饥饿问题，但是低优先级，到了过期时间，就会变成立即执行任务，在`Schedule.js中的workLoop函数中`每次执行完一个任务就会去检查一点定时任务是否到期，如果到期，那么久加入`同步任务队列(taskQueue)`立即执行。
3.  React 有三套优先级的机制

    - ### React 事件优先级(touch、click、媒体事件、message 事件、Drag 事件)(区分于浏览器事件，浏览器事件被 React 捕捉到之后，会自己处理下发事件，称为 React 事件)
      - #### 分类(getEventPriority)
        - DiscreteEventPriority(离散事件) => SyncLane
          > 点击，媒体事件，input 相关事件
        - ContinuousEventPriority(连续事件) => InputContinuousLane
          > 拖放(drag)API，鼠标和 touch 的事件
        - DefaultEventPriority(默认事件) => DefaultLane
          > setTimeout 触发的更新任务
        - IdleEventPriority(空闲事件) => IdleLane
      - #### 特性理解
        - `Discrete Event`和`Continous Event`与`Default Event`的区别就是将过渡标识(`ReactCurrentBatchConfig.transition`)设置为 null、将当前更新等级(`currentUpdatePriority`)设置成对应优先级(Priority),回调函数执行后再会恢复前一个状态。 是通过过渡标识来实现优先级的。
        - 委派事件在冒泡阶段执行(媒体事件以及 scroll/load/toggle 等)，非委派事件在捕获阶段执行(click,touchMove)
        - 同时 chrome 73 以后对`touch` 和 `wheel` 事件把默认行为改成 passive:true，就是不阻塞滚动。react 这边做了兼容，统一把两个事件设置为了不阻塞。
        - message 事件可能是任意等级，主要是从
        - 事件优先级是对应的 lane 优先级，为什么没有自己的等级???
    - ### Lane 优先级

      - #### 分类
        - NoLanes 、NoLane 都是 0
        - SyncLane 是第一位：同步
        - InputContinuousHydrationLane 第二位：input 连续的???
        - InputContinuousLane 第三位：input 连续的???
        - DefaultHydrationLane 第四位：
        - DefaultLane：第五位：
        - TransitionHydrationLane：第六位
        - TransitionLanes 有 16 位,从第 7 位开始到 22 位
          - 还分为 16 个小颗粒，对应 TransitionLanes1 ~ TransitionLanes16
        - RetryLanes 有 5 位，从 23 到 27
          - 还分为 5 个小颗粒，对应 RetryLane1~RetryLane5
          - SomeRetryLane = RetryLane1
        - SelectiveHydrationLane 第 28 位： 是选中的事件
        - IdleHydrationLane 第 29 位：
        - IdleHydrationLane 第 30 位：
        - OffscreenLane 第 31 位：
        - NonIdleLanes 是 第 1 位到 28 位： 是非空闲任务，包含同步车道、连续车道、默认车道、渐变车道、重试车道、选中事件车道

    - ### Schedule 优先级

      - #### 分类

        - ImmediatePriority = 1; // 立即执行任务的优先级，级别最高
          - 对应延迟时间：-1 ，也就是立即执行
        - UserBlockingPriority = 2; // 用户阻塞的优先级，也就是用户一直操作的间隔
          - 对应延迟时间：250，
        - NormalPriority = 3; // 正常优先级
          - 对应延迟时间：5000
        - LowPriority = 4; // 较低的优先级
          - 对应延迟时间：10000
        - IdlePriority = 5; // 优先级最低，闲表示任务可以闲置

    - 转换方法：lane 优先级 转 React 事件优先级(lanesToEventPriority)；React 事件转 Schedule 优先级(ensureRootIsScheduled 函数内 switch (lanesToEventPriority(nextLanes)) 中)；lane 转过期时间

## 疑问点

1. [React Scheduler 为什么使用 MessageChannel 实现](https://juejin.cn/post/6953804914715803678)
   > 不使用 requestIdleCallback 的原因：
   - 兼容性，对浏览器版本要求高。
   - 最重要的一点。在空闲状态下，requestIdleCallback(callback) 回调函数的执行间隔是 50ms（W3C 规定），也就是 20FPS，1 秒内执行 20 次，肯定是不行的。
2. [React 为什么使用 Lane 技术方案](https://juejin.cn/post/6951206227418284063)

   - 使用 expirationTime 模型是可以进行并发模式的。

   - 问题：ExpirationTime 的机制是，task.expirationTime <= currentExecTaskTime 都会执行，但是这一堆任务重，是有优先级的(为什么低优先级的会回出现在任务中)，导致一些耗时比较长的 I/O 任务会阻塞耗时比较短的 cpu 任务。
     1. 为什么低优先级的会回出现在任务中：因为进行了批处理，不同优先级的任务由于任务的过期时间都小于当前时间，所以会一起执行。也就是两个任务的提交有依赖关系，必须同时完成才能到提交阶段,进而发送提交去更新页面。
   - 原因：ExpirationTime 的机制使任务中，不同优先级的任务一起执行了。并且有`耗时的高优先级(Suspense+useTrasitoin)`和`不耗时低优先级(cpu 任务)`，导致的。

     1. 先执行`耗时的高优先级任`，后执行`不耗时的低优先级任务`，这样会导致页面卡主。
     2. 一起执行，就是现在

   - 解决：(思路是分开执行，这样就不产生更新依赖了)
