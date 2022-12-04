# react

1. react 官网：https://reactjs.org/docs/
2. react 工作组-18 版本：https://github.com/reactwg/react-18/

## react 概念理解

1.  ### concurrent mode 和 Fiber

    问题：大量 DOM 同时更新的情况下，会出现延迟很严重的情况，具体表现为交互/渲染卡顿现象。比如，input 框收集用户的输入来过滤大量列表的场景，输入一个字符，然后过滤大量列表然后渲染出来是一个很耗时的过程，由于 js 是单线程，这个过程会一直占用主线程，这期间用户再次输入字符，也不会响应，造成交互阻塞。

    解决：

        1. debounce 一定时间再执行过滤列表，能解决用户连续输入问题，但是没有充分利用空闲时间。

        2. 将“过滤列表然后渲染出来”这个过程分成“若干个小任务”，每一帧去执行“若干个任务“的子集任务，超出一帧的时间就暂停，然后检查有没有高优先级的任务过来，如果有先执行高优先级的任务，再执行剩余“若干个任务”的子集任务。concurent mode就是react实现这种模式的叫法，Fiber对应每个DOM和组件的任务和状态，是拆分的任务单元。

2.  ### concurrent Mode 的启动方式和使用方法例子

    App.js

    ```
      import React, { useEffect } from "react";
      import ReactDOM from "react-dom/client";
      import NewList from "./list";
      const App = () => {
          const [mode, setMode] = useState<Mode>('legacy');
          const [value, setValue] = useState('');
          const [query, setQuery] =  useState('');
          const query2 = useDeferredValue(value);
          const changeMode = () => {
            setMode((mode) => {
              const index = MODE.findIndex((item) => {return item === mode});
              const next =  index === MODE.length -1 ? 0:index + 1
              return MODE[next];
            })
          }
          const changeValue:React.ChangeEventHandler<HTMLInputElement> = (e) => {
            const currentValue = e.target.value;
            setValue(currentValue);
            switch(mode){
              case 'legacy':
                setQuery(currentValue)
                break;
              case 'startTransition':
                startTransition(() => {
                  setQuery(currentValue);
                })
                break;
            }
          }
          const _query = mode === "useDeferredValue"?query2:query;
          console.log(_query);
          return(
            <div>
              <button onClick={changeMode}>{mode}</button>
              <input type="text" value={value} onChange={changeValue} />
              <NewList query={_query}></NewList>
            </div>
          )
      };
      // 开启concurrent Mode 需要使用createRoot
      const root = ReactDOM.createRoot(document.getElementById("root")!);
      root.render(<App />);

    ```

    NewList.js

    ```
      import React,{memo} from "react"
      /*  模拟数据  */
      const mockDataArray = new Array(10000).fill(1)
      /* 高量显示内容 */
      function ShowText({ query }){
        const text = 'asdfghjk'
        let children
        if(text.indexOf(query) > 0 ){
            /* 找到匹配的关键词 */
            const arr = text.split(query)
            children = <div>{arr[0]}<span style={{ color:'pink' }} >{query}</span>{arr[1]} </div>
        }else{
            children = <div>{text}</div>
        }
        return <div>{children}</div>
      }
      /* 列表数据 */
      function List ({ query }){
          console.log('List渲染')
          return <div>
              {
                mockDataArray.map((item,index)=><div key={index} >
                    <ShowText query={query} />
                </div>)
              }
          </div>
      }
      /* memo 做优化处理  */
      const NewList = memo(List)
      export default NewList;
    ```

3.  ### 撕裂(tearing) 是图形编程中的术语，是指视觉上的不一致。react18 中的 concurrent render 并发模式带来多个状态同时出现的现象。

    产生原因：

    - 比如，react 在渲染过程中，被点击事件中断,也就是 startTransition、Suspends 等功能被暂停，去执行其他函数，这个函数也影响这个状态，就会出现这个状态控制多个元素会出现不同的状态值。[具体讲解](https://github.com/reactwg/react-18/discussions/69)

    - 使用 external state 就会产生 tearing，因为 React 不能及时的知道值的变化。外部 state 就是不是 props、state、context 的值。比如 tearing 的例子，先更新外部的值，再触发 react 更新外部的值，就是属于外部的值，就会产生撕裂。

    解决办法：使用 useSyncExternalStore 来使用 external state。[解决参考](https://github.com/reactwg/react-18/discussions/70)

4.  lane 赛道优先级
    - NoLanes 、NoLane 都是 0
    - SyncLane 是第一位：同步
    - InputContinuousHydrationLane 第二位：input 连续的???
    - InputContinuousLane 第三位：input 连续的???
    - DefaultHydrationLane 第四位：
    - DefaultLane：第五位：
    - TransitionLanes 有 16 位,从第 6 位开始到 22 位
      - 还分为 16 个小颗粒，对应 TransitionLanes1 ~ TransitionLanes16
    - RetryLanes 有 5 位，从 23 到 27
      - 还分为 5 个小颗粒，对应 RetryLane1~RetryLane5
      - SomeRetryLane = RetryLane1
    - SelectiveHydrationLane 第 28 位： 是选中的事件
    - IdleHydrationLane 第 29 位：
    - IdleHydrationLane 第 30 位：
    - OffscreenLane 第 31 位：
    - NonIdleLanes 是 第 1 位到 28 位： 是非空闲任务
5.  `act`case 是测试时候的环境，也就是 act 函数

## react 实现细节

1. `创建root(createRoot)`，是在亿图的”React Fiber“的图文中。
2. `监听所有支持的事件(listenToAllSupportedEvents)`，在 root 上监听原生事件，增加回调函数，后面由 React 处理下发 React 事件。

   - `创建有优先级的监听事件回调(createEventListenerWrapperWithPriority)`：
     - `下发离散事件(dispatchDiscreteEvent)`：点击，媒体事件，input 相关事件属于`Discrete Event`都是 SyncLane；
     - `下发连续事件(dispatchContinuousEvent)`：拖放(drag)API，鼠标和手势的事件属于`Continuous Event`是 InputContinuousLane；
     - message 事件会获取”调度“的优先级，其中`Immediate`属于`Discrete Event`,`UserBlocking`属于`Continous Event`剩下的是`Default Event`；
     - `下发普通事件(dispatchEvent)`其他是`Default Event`
   - `Discrete Event`和`Continous Event`与`Default Event`的区别就是将过渡标识(`ReactCurrentBatchConfig.transition`)设置为 null、将当前更新等级(`currentUpdatePriority`)设置成对应优先级(Priority),回调函数执行后再会恢复前一个状态。 是通过过渡标识来实现优先级的。
   - `委派事件(click,touchMove)`在冒泡阶段和捕获阶段都有回调事件，`非委派事件(媒体事件以及 scroll/load/toggle 等)`在仅在捕获阶段有回调事件，因为 scroll 事件是不会冒泡的，只能在捕获阶段监听。
   - 同时 chrome 73 以后对`touch` 和 `wheel` 事件把默认行为改成 passive:true，就是不阻塞滚动。react 这边做了兼容，统一把两个事件设置为了不阻塞。

3. ### `更新容器（updateContainer(element,container,parentComponent,callback)）`,element 是 App 组件,container 是`new FiberRootNode`

   - <3.1> 获得`事件时间(eventTimer)`：当前距离浏览器打开的时间

   - <3.2> `获得更新管道(requestUpdateLane)`：从`第一个Fiber`上获取更新道路

     - 如果不是 ConcurrentMode，返回同步管道，因为一共只有 concurrentMode(ConcurrentRoot)和 NoMode(LegacyRoot)两种模式，
     - 如果 render 阶段，暂时官方不支持：executionContext & RenderContext) !== NoContext && workInProgressRootRenderLanes !== NoLanes
     - 如果是 transition 任务，将要更新的 fiber 挂载 ReactCurrentBatchConfig$3.transition.\_updatedFibers 上，`获取下一个渐变车道(claimNextTransitionLane)`,一共有 16 个渐变车道，第 16 个渐变车道的下一个渐变车道是第一个渐变车道，这样形成了一个循环，可以无限获取下一个渐变车道。
     - 如果是 React 内部的更新，比如 flushSync，根据上下文环境(也就是调用前设置的值)优先级得到。
     - 如果是浏览器事件的优先级，会查询`创建有优先级的监听事件回调`设置好的优先级。

   - <3> 从父组件上继承 context
   - <4> `创建更新对象(createUpdate)`，要更新的组件放在 element 上，同时挂着 eventTime、lane
   - <5> `把更新进行排队(enqueueUpdate)`

     - 如果是`render阶段(renderContext)`,把更新加在 fiber.updateQueue.shared.pending 链表的第一个。然后`从当前fiber到root Fiber标记更新管道(markUpdateLaneFromFiberToRoot)`
     - 如果不是 render 阶段(???可能是什么阶段)，将`排队在并发类型更新上(enqueueConcurrentClassUpdate)`把更新放在 fiber.updateQueue.shared.interleaved 链表上,如果`interleaved`为空，将`shared`push 到 concurrentQueues。然后`从当前fiber到root Fiber标记更新管道(markUpdateLaneFromFiberToRoot)`
     - <5.1> `从当前fiber到root Fiber标记更新管道(markUpdateLaneFromFiberToRoot)`
       - 本次更新的 lane 和 当前 fiber.lane 做合并，`fiber.alternate.lanes`,也就是旧的也会合并这次更新的 lane
       - 本次更新的 lane 跟从`当前Fiber`的`父Fiber` 到 `root Fiber`的`childLanes`做合并，记录下来所有子孙节点的更新

   - <6> `调度更新任务(scheduleUpdateOnFiber)`，`scheduleUpdateOnFiber(root, fiber, lane, eventTime);` root 是 new FiberRootNode，fiber 常常是第一个 fiber。

     - <6.1> `检查更新嵌套(checkForNestedUpdates)`,超过一定数量就是死循环。比如在 componentDidUpdate 中调用 setState,该 setState 回触发更新，更新完就会调用 componentDidUpdate 生命，这样就死循环了。
     - <6.2> `在root上标记被更新(markRootUpdated)`：将该更新的 eventTime 放在 new FiberRootNode 上的 eventTimes 里。之前已经把整个加入 shared.pending 上了，现在是记录事件创建时间。并且如果车道不是`空闲车道(idleLane)`就清除暂停车道和中断恢复车道。
     - <6.3> 如果是 render 阶段，会报 warn。如果是一个正常的更新，就`确保root被调度了(ensureRootIsScheduled)`，也就是去调度更新。
       - `确保root被调度了(ensureRootIsScheduled)`，`ensureRootIsScheduled(root, currentTime)`,root 是 new FiberRootNode,currentTime 是 eventTime。
         1. `标记饥饿车道为过期车道(markStarvedLanesAsExpired)`：就是把 root 上的 pendingLanes 里的每个车道对应 expirationTimes 里的 expirationTime 和当前时间(eventTime)对比，如果过期就在 root.expiredLanes 标记车道。
         2. `获取下一个任务的车道(getNextLanes)`(???需要仔细写一下)
         - 如果没有车道，直接返回，结束整个任务。
         3. 如果有车道，再次获取最高优先级的车道(最右位)，因为有可能因为`纠缠(entangledLanes)`而变成多位车道。
         4. 如果 root.callbackNode 不为空，就清除 root.callbackNode。callback。
         - 如果是 act 环境就结束。
         5. 分同步和异步来执行任务：
            - 同步车道,也就是同步执行任务。统一都放进 synvQueue 中，也就是`在root上执行同步工作(performSyncWorkOnRoot)`放在 syncQueue 中，然后设置一个`微任务定时器(scheduleMicrotask)`来执行，统一在`刷新同步callback(flushSyncCallbacks)`中执行。也就是等一轮事件结束后就执行。特殊例子就是 React callbacks 被调度在特殊的交错式队列，这种方式的同步。
            - 异步车道。将车道(lane)映射成事件优先级(event priority),再对应成 schedule 优先级，如果是测试环境(actQueue)就返回；如果是正常的 concurrent 模式，就调用`调度callback(scheduleCallback)`函数，来执行`在root上执行并发工作(performConcurrentWorkOnRoot)`，也就是 `Schedule.unstable_scheduleCallback`也就是进入到了`Schedule`的部分。

   - <7> `纠缠渐变(entangleTransitions)`???

4. ### 执行更新任务： 经过调度之后，开始执行 callback，也就是`在root上执行同步工作(performSyncWorkOnRoot)`和`在root上执行并发工作(performConcurrentWorkOnRoot)`

   - `在root上执行同步工作(performSyncWorkOnRoot)`

     - `刷新消极影响(flushPassiveEffects)`,(???刷新消极影响是怎么操作的)
     - `获取下一个任务的车道(getNextLanes)`,为了再次判断是不是还有同步车道，如果没有，就结束，去再次执行`确保root被调度了(ensureRpptIsScheduled)`去看看还没有没别的任务执行。
     - `同步渲染root(renderRootSync)`

     <!-- - `在root上执行并发工作(performConcurrentWorkOnRoot)` -->

## 属性解析

1. Fiber 上的 current 就是当前要更新的 Fiber
2. stateNode
3. ReactCurrentBatchConfig、ReactCurrentBatchConfig$1、ReactCurrentBatchConfig$2、ReactCurrentBatchConfig$3
   - 初始值都是 ReactSharedInternals.ReactCurrentBatchConfig
   - ReactCurrentBatchConfig 是在 dispatchDiscreteEvent、dispatchContinuousEvent 这两个委托的事件赋值
   - ReactCurrentBatchConfig$1 是在 requestCurrentTransition 函数中返回，没有赋值场景；
   - ReactCurrentBatchConfig$2 是在 startTransition 函数中赋值
   - ReactCurrentBatchConfig$3 是在 requestUpdateLane、discreteUpdates、flushSync、commitRoot、commitRootImpl、flushPassiveEffects 中使用
   - 都是记录原来的值，然后设置当前值，然后再设置回原来的值。
   - ReactCurrentBatchConfig$3 上
4. Update(createUpdate) 单像循环链表
   - eventTime
   - lane
   - tag
   - payload
     - element
   - callback
   - next
5. fiber
   - alternate
     - alternate，我们需要它是因为大多数时间我们将会有两个 fiber tree。一个代表着已经渲染的 dom， 我们成其为 current tree 或者 old tree。另外一个是在更新（当调用 setState 或者 render）时创建的，称其为 work-in-progress tree。work-in-progress tree 不会与 old tree 共享任何 fiber。一旦我们完成 work-in-progress tree 的构建和 dom 的改变，work-in-progress tree 就变成了 old tree。所以我们使用 alternate 属性去链接 old tree。fiber 与其 alternate 有相同的 tag，type，statenode。有时我们渲染新的组件，它可能没有 alternate 属性。
   - updateQueue
     - shared
       - pending
       - interleaved // 交错更新队列
       - lanes
   - flags // 副作用集合。比如：比如：重置文本，重置 ref，插入，替换，删除 dom 节点。
   - return // `父Fiber`
   - childLanes // 所有`子Fiber` 需要更新的 lane，有值表示当前节点下有子节点需要更新
   - suspendedLanes 挂起的 lane
   - pingedLanes 中断被恢复的 lanes
   - expirationTimes
6. nestedUpdateCount 和 rootWithNestedUpdates

   - 嵌套更新的次数，和有嵌套更新的 root
   - 这种检查的非常有必要的，比如我们在 render 中调用了 setState，那么程序就会死循环，为了避免这种情况发生，React 记录了一个全局变量 nestedUpdateCount，当这个值超过 NESTED_UPDATE_LIMIT，也就是 50 的时候， React 判定此时的代码中出出现了死循环，直接返回，并且给出警告。

7. isRunningInsertionEffect
8. isFlushingPassiveEffects 和 didScheduleUpdateDuringPassiveEffects
9. workInProgressRootInterleavedUpdatedLanes 有值的话代表在 render 阶段有交错时更新。
10. workInProgressRootExitStatus 暂停当前更新
11. workInProgressRootPingedLanes
12. root-fiber
    - tag // LegacyRoot 或 ConcurrentRoot
    - callbackNode // Scheduler.scheduleCallback 返回的节点。表示根用户将处理的下一个渲染任务。
    - callbackPriority
    - expirationTimes
    - expiredLanes 过期管道(expirationTime<=currentTime)，处理任务时强制立即完成；
    - entangledLanes 纠缠 lane ???
    - entanglements
13. NonIdleLanes // 所有的非空闲管道加和
14. workInProgressRootRenderTargetTime 没有启用交错式更新式时，会花费的时间
15. ReactSharedInternals(react 和 react-dom 共享)
    - ReactCurrentBatchConfig
      - transition
        - \_updatedFibers // 放着过渡的 fiber 任务
    - ReactCurrentActQueue
      - isBatchingLegacy // ReactTestUtils.act 函数才是这个环境,也就是测试环境
    - ReactCurrentDispatcher
      - current // 放着一整套 hooks
    - ReactCurrentOwner
      - current
16. scheduleCallback$1 里的 scheduleCallback 对接 Scheduler 的 unstable_scheduleCallback
    unstable_scheduleCallback，也就是这里开始调度的
