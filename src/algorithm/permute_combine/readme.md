

### 全排列：
  假设有一个数组{1, 2, 3, 4, 5}，
  我们需要将数组中的所有元素进行排序，那么第一个位置，我们可以选择五个数字的任何一个，共有5种选择。
  第二个位置，可以选择剩余四个数字的任何一个，共有4种选择。
  第三个位置，可以选择剩余三个数字中的任何一个，共有3种选择。
  第四个位置，可以选择剩余两个数字中的任何一个，共有2种选择。
  最后一个位置，因为只剩一个数字，没得选择，所有只有一种选择。
  那么该数组总共的排列个数为5 ∗ 4 ∗ 3 ∗ 2 ∗ 1 = 120 54321=1205∗4∗3∗2∗1=120种。
  如果数组的元素不重复，元素个数为N，按照上面的推导，容易得出该数组的全排列个数为N!, 即P(N)=N!

### 任意个数排列：
  比如5个元素，我们只需要取3个进行排序，按照前面的分析，很容易得知排列的个数为5* 4 * 3 = 60。
  容易得出该数组的任意个数排列个数为
  $$P(N,k) = \frac{N!}{(N-k)!}\$$

### 组合
  假设同样是数组{1, 2, 3, 4, 5}，我们需要从数组中选择任意3个元素，那么有多少种方式呢？
  根据前面的推导，我们能够得知，如果从5个元素中选择3个元素，排列的方式有
  $$P(5,3) = \frac{5!}{(5-3)!}\ = 60$$
  但是组合的时候，对顺序是不敏感的，比如我们选1,2,3与选1,3,2，虽然是两种排列方式，但是在组合里是一种情况。3个元素的全排列一共有3！=6种，就是这6种其实是一种组合。
​
  所以组合的公式为
  $$C(N,k) =\frac{N!}{(N−k)!}\ / k!$$
  即
  $$C(N,k) =\frac{N!}{(N−k)!k!}\$$





















​



