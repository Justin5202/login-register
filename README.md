# login-register
demo(https://justin5202.github.io/login-register/)

原生JS做的表单验证，知识点：
- 元素选择
- 属性操作
- 正则表达式
- 字符串操作

**重点**，原生JS实现addClass，removeClass方法，我们都知道，原生JS有

getAttribute：获取某一个属性的值

setAttribute：建立一个属性，并同时给属性捆绑一个值

createAttribute：仅建立一个属性

removeAttribute：删除一个属性

但要实现addClass，removeClass就要重新定义方法

```
  function addClass( elements,cName ){ 
      if( !hasClass( elements,cName ) ){ 
        elements.className += " " + cName; 
      }; 
    }; 
```

```
  function removeClass( elements,cName ){ 
      if( hasClass( elements,cName ) ){ 
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ),"" ); 
        // replace方法是替换 
      }; 
    };
```
```
  function hasClass( elements,cName ){ 
      return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
      // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
	}; 
```
