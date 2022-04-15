#### ASCII码
> MDN：https://developer.mozilla.org/zh-CN/docs/Glossary/ASCII

> **维基百科**：https://zh.wikipedia.org/wiki/ASCII
#### Unicode码
> MDN：https://developer.mozilla.org/zh-CN/docs/Glossary/Unicode

> 维基百科：https://zh.wikipedia.org/wiki/Unicode

> **标准文档**：https://www.unicode.org/main.html

> **字符平面映射**：https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84

> **Unicode和UTF问答**：https://www.unicode.org/faq/utf_bom.html#UTF8

> **UTF-16维基百科(内含代理项算法机制)**：https://zh.wikipedia.org/wiki/UTF-16

> 汉字编码范围：https://www.qqxiuzi.cn/zh/hanzi-unicode-bianma.php

> 字节序：https://zh.wikipedia.org/wiki/%E5%AD%97%E8%8A%82%E5%BA%8F

1. Unicode 标准和 ISO/IEC 10646 支持使用通用字符库的三种编码形式（UTF-8、UTF-16、UTF-32）
2. UTF-8(USC Transformation Format 8)
3. UCS(Universal character set)
4. 1个二进制位称为1个bit，8个二进制位称为1个Byte，也就是1个字节（8位），2个字节就是1个Word（1个字，16位），则DWORD（DOUBLE WORD）就是双字的意思，两个字（4个字节/32位）。
5. Javascript 是用的UTF-16的编码格式的，援引：http://es5.github.io/x2.html#x2
6. UFT-32始终用32个bit表示；UTF-16用16个bit表示第0个平面，用16个bit的部分结成代理对表示辅助平面；UTF-8使用8位/16位/24位/32位来从低到高位分别表示。








#### 常见bug
1. qs@6.10.3的解码bug：qs.parse("a=11233=+").
> 解决:使用unicode编码之后的字符来传递
