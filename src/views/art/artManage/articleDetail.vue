<template>
  <div id="article" v-loading="loading">
    <div class="article-warp">
      <div class="article-message">
        <p class="article-title">
          aa
        </p>
        <div class="article-info">
          <i class="iconfont icon-calendar" />
          发表于 2019年10月20日 •
          <i class="iconfont icon-folder" />
          <span class="classify" @click="toList('category', category.id)">aa</span> •
          <i class="iconfont icon-eye" />
          10次围观
        </div>
        <div class="article-sub-message">xxxx</div>
      </div>
      <md-article :contents="article.htmlContent" />

      <div class="tags">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="tag"
          @click="$router.push({name: 'articleList', query:{type: 'tag', id: tag.id}})"
        >
          <i class="iconfont icon-tag" />
          {{ tag.name }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import mdArticle from './mdArticle'
// import { getArticle } from '@/api/article.js'

export default {
  name: 'Articles',
  components: {
    mdArticle
  },
  data() {
    return {
      article: {},
      category: {},
      tags: [],
      loading: false
    }
  },
  computed: {

  },
  watch: {
    $route(route) {
      this.initData()
    }
  },
  created() {
    this.initData()
  },
  mounted: function() {

  },
  methods: {

    initData() {
      this.article = {}
      this.category = {}
      this.tags = []
      const id = this.$route.query.id
      if (id) {
        this.loading = false
        //  getArticle({
        //    id:id
        //  })
        //   .then((data) => {
        //     console.log(data)
        //     this.article = data.data.article
        //     this.category = data.data.category
        //     this.tags = data.data.tags
        //     this.qrcode = data.data.qrcode
        //     this.pn = data.data.pn
        //     this.loading = false
        //   })
        //   .catch(()=> {
        //     this.loading = false
        //   })
      }
      this.loading = true
      this.article = {
        htmlContent: '"<h2 class="my-blog-head" id="my-blog-head217">前言</h2><blockquote>↵<p>装饰器（Decorator）是ES7中的一个新语法，目前还没有被大部分环境支持（仍然是 Stage 2 的 ES Proposal），不过我们可以通过安装 <strong>babel-plugin-transform-decorators-legacy</strong> 这个插件来使用。</p>↵</blockquote>↵<p>其实装饰器并不是什么新鲜的东西，在其他程序语音这已经有使用，熟悉python的，一定对这个不陌生，在java中同样也有类似的语法，称之为注解（Annotation），是通过反射来实现的，语法上看起来相似，实际还是和Decorator有点区别。</p>↵<p>下面我们就来看看javascript中的装饰器到底是怎么使用。</p>↵<h2 class="my-blog-head" id="my-blog-head218">什么是装饰器</h2><p>那么什么是装饰器呢？<br>在我的理解，其实就是对类、函数、属性的一种包装，也就是在类、函数或属性生效前后填加一些行为，包装多一层逻辑，但不影响原代码的逻辑。在网上看过一句话形容装饰器，我觉得还不错：非侵入式的行为修改。</p>↵<p>举个例子，函数节流，所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数，降低函数的执行频率。节流不需要关系函数内部的逻辑，只需要处理好函数的调用频率即可，于函数本身的逻辑无关，这就是在函数外包装多一层逻辑。</p>↵<p>接下来以函数节流为例子来讲解。</p>↵<h2 class="my-blog-head" id="my-blog-head219">函数节流例子</h2><h3 class="my-blog-head" id="my-blog-head220">普通版</h3><p>一般函数节流有两种实现方式（时间戳和定时器），这里就使用时间戳的版本。(ps:因为使用nodejs写案例，为了方便测试，我们把定时执行函数改为定次（每调用几次就真正执行一次）。</p>↵<pre><code class="language-javascript">class Log {↵    sendMsg (msg) {↵        console.log(&#39;msg:&#39;, msg);↵    }↵}↵↵/**↵ * 函数节流↵ * @param {*} fn 原函数↵ * @param {*} count 间隔调用次数↵ */↵function throttle (fn, count) {↵    let previous = 0;↵    return function () {↵        previous++;↵        // 达到次数，真正调用原函数↵        if (previous === count) {↵            const args = arguments;↵            fn.apply(this, args);↵            previous = 0;↵        }↵    };↵}↵↵const log = new Log();↵// 设置没5次执行一次↵const send = throttle(log.sendMsg.bind(log), 5);↵for (let i = 0; i &lt; 20; ++i) {↵    send(&#39;data&#39;);↵}</code></pre>↵<p>执行结果，可看出for循环了20次，但只打印了4条记录。<br><img src="http://blogimg.codebear.cn/FlSJyDvWM37uIW0p1VoVy0AbkSju" alt="image.png"></p>↵<h3 class="my-blog-head" id="my-blog-head221">装饰器版</h3><pre><code class="language-javascript">class Log {↵    @throttle(5)↵    sendMsg (msg) {↵        console.log(&#39;sendMsg:&#39;, msg);↵    }↵}↵↵function throttle (count) {↵    let previous = 0;↵    return (target, value, des) =&gt; {↵        const fn = des.value;↵        des.value = function () {↵            previous++;↵            // 达到次数，真正调用原函数↵            if (previous === count) {↵                fn.apply(this, arguments);↵                previous = 0;↵            }↵        };↵        return des;↵    };↵}↵↵const log = new Log();↵for (let i = 0; i &lt; 20; ++i) {↵    log.sendMsg(&#39;data&#39;);↵}</code></pre>↵<p>执行结果同上。</p>↵<h3 class="my-blog-head" id="my-blog-head222">区别</h3><p>上面两段代码都得到了同样的结果。<br>但是第一段代码不难看出其弊端：<br>第一：需要手动包装多一个函数出来，然后调用的是新的函数，视觉上脱离了log类，假如代码比较多可读性就会相对较差。<br>第二：假如又new了一个Log实例，使用sendMsg方法时，又需要重新包装一遍。</p>↵<p>再来看看装饰器版本，在类中，方法上使用一次。之后无论何时直接执行log.sendMsg都会节流。代码可读性提高了，也减少了每次都需要再包装的成本。</p>↵<h2 class="my-blog-head" id="my-blog-head223">装饰器的使用</h2><h3 class="my-blog-head" id="my-blog-head224">作用对象</h3><p>装饰器可作用于类、函数、属性上，js中目前我了解的只能作用于类和类的方法上（也可能是因为那个库，不过已经可以实现很多功能了）。</p>↵<h3 class="my-blog-head" id="my-blog-head225">写法</h3><p>这里介绍作用于类和函数上的写法。<br>其实写法都一样，有两种方式，一种是带参一种是不带参。如下如：</p>↵<pre><code class="language-javascript">function addOne (target, value, des) {↵    const fn = des.value;↵    des.value = function (data) {↵        const res = fn.call(this, data);↵        return res + 1;↵    };↵}↵↵function add (num) {↵    return (target, value, des) =&gt; {↵        const fn = des.value;↵        des.value = function (data) {↵            const res = fn.call(this, data);↵            return res + num;↵        };↵    };↵}↵↵function formatResult (target) {↵    const keys = Object.getOwnPropertyNames(target.prototype);↵    for (let i = 0; i &lt; keys.length; ++i) {↵        if (keys[i] === &#39;constructor&#39;) {↵            continue;↵        }↵        const fn = target.prototype[keys[i]];↵        target.prototype[keys[i]] = function (data) {↵            const res = fn.call(this, data);↵            return {↵                result: res↵            };↵        };↵    }↵}↵↵function isNum (num) {↵    return function (target) {↵        const keys = Object.getOwnPropertyNames(target.prototype);↵        for (let i = 0; i &lt; keys.length; ++i) {↵            if (keys[i] === &#39;constructor&#39;) {↵                continue;↵            }↵            const fn = target.prototype[keys[i]];↵            target.prototype[keys[i]] = function (data) {↵                const res = fn.call(this, data);↵                res.status = false;↵                if (res.result === num) {↵                    res.status = true;↵                }↵                return res;↵            };↵        }↵    };↵}↵↵class MathTest {↵    @addOne↵    add (num) {↵        return num;↵    }↵↵    @add(2)↵    addTwo (num) {↵        return num;↵    }↵}↵↵@isNum(4)↵@formatResult↵class MathTest2 {↵    @addOne↵    add (num) {↵        return num;↵    }↵↵    @add(2)↵    addTwo (num) {↵        return num;↵    }↵}↵↵console.log(new MathTest().add(3));↵console.log(new MathTest().addTwo(3));↵↵console.log(new MathTest2().add(3));↵console.log(new MathTest2().addTwo(3));↵↵执行结果如下：↵4↵5↵{ result: 4, status: true }↵{ result: 5, status: false }</code></pre>↵<p>由上面代码不难看出，简单点理解，其实装饰器就是函数，个人认为可以理解为高阶函数的语法糖。<br>然后所谓的可以传参数，其实就是利用闭包。</p>↵<h3 class="my-blog-head" id="my-blog-head226">原理</h3><p>由上面可以看出装饰器可作用于成员方法和类上，他们的函数对应的参数不一样。</p>↵<h4 class="my-blog-head" id="my-blog-head227">作用于成员方法（变量）</h4><p>装饰器作用于成员方法上，可接收三个参数<strong>target, key, descriptor</strong>，参数与<strong>Object.defineProperty</strong>的参数一致：</p>↵<p>target: 方法所在的class<br>key: 方法名<br>descriptor: 描述符</p>↵<pre><code class="language-javascript">Object.defineProperty(obj, &quot;key&quot;, {↵  enumerable: false,↵  configurable: false,↵  writable: false,↵  value: &quot;static&quot;↵});</code></pre>↵<p>在来看看如何使用，以上面数值加一为例子：</p>↵<pre><code class="language-javascript">function addOne (target, value, des) {↵    const fn = des.value; // 先存起原始数值↵    des.value = function (data) { // 覆盖原来的↵    // 原函数执行前做一些处理↵        const res = fn.call(this, data); // 这里通过call执行原来的函数得到接口↵    // 原函数执行后做一些处理↵        return res + 1; // 结果加1↵    };↵}</code></pre>↵<p>没错就是这么简单，可以在原函数执行前后做处理，甚至还可以处理原函数传入的参数。</p>↵<h4 class="my-blog-head" id="my-blog-head228">作用于类class</h4><p>装饰器作用于class上，可接受一个参数<strong>target</strong></p>↵<pre><code class="language-javascript">function formatResult (target) {↵    const keys = Object.getOwnPropertyNames(target.prototype); // 获取原型链上的属性名↵    for (let i = 0; i &lt; keys.length; ++i) {↵        if (keys[i] === &#39;constructor&#39;) { // 构造函数过滤掉↵            continue;↵        }↵        const fn = target.prototype[keys[i]];↵        if (typeof fn === &#39;function&#39;) { // 如果是函数↵            target.prototype[keys[i]] = function (data) {↵                const res = fn.call(this, data); // 得到原函数执行结果↵                // 包装下结果↵                return {↵                    result: res↵                };↵            };↵        }↵    }↵}</code></pre>↵<h3 class="my-blog-head" id="my-blog-head229">执行顺序</h3><p>每个class和属性都可以有多个装饰器，那么装饰器必须要有一定的执行顺序，下面我们通过一个简单的例子就能看出它的顺序：</p>↵<pre><code class="language-javascript">function print (num) {↵    console.log(&#39;pre:&#39;, num);↵    return function (target) {↵        console.log(num);↵    };↵}↵function print2 (num) {↵    console.log(&#39;pre:&#39;, num);↵    return function (target) {↵        console.log(num);↵    };↵}↵↵@print(1)↵@print2(2)↵@isNum(4)↵@formatResult↵class MathTest2 {↵    @print(3)↵    @print2(4)↵    @addOne↵    add (num) {↵        return num;↵    }↵↵    @print(5)↵    @print2(6)↵    @add(2)↵    addTwo (num) {↵        return num;↵    }↵}↵↵new MathTest().add(3);↵new MathTest().addTwo(3);↵↵new MathTest2().add(3);↵new MathTest2().addTwo(3);</code></pre>↵<p>print和print2是同样的一个函数，都是打印数据。<br>执行结果：<br><img src="http://blogimg.codebear.cn/FqXUQujeUjrS70wZPPcRnZ9LczeT" alt="image.png"></p>↵<p>可以看出，pre是按1-6的顺序打印，也就是自顶向下顺序执行。<br>在看看另一个顺序4，3，6，5，2，1，这个是在调用函数时执行的，看起来好像没什么规律顺序，但仔细对照源码，不难发现，class里面的函数上的装饰器优先执行，并且自底向上执行。<br>也就是函数&gt;class，然后越靠近函数名（类名）的越先执行。</p>↵<h2 class="my-blog-head" id="my-blog-head230">总结</h2><p>js装饰器大概就这么多内容需要了解，搞明白原理和执行顺序，基本就可以做很多好用的装饰器了，比如检验函数传入的参数，封装函数统一返回结果，设置只读等等等等。</p>↵<p>装饰器的原理很简单，不过已经可以用来做很多高可用的东西。在项目框架中引入装饰器，可以使代码更简洁已读。</p>↵<p>另外，再安利typescript，因为typescript上使用装饰器，拥有更多功能，比如作用于函数参数上，作用于class里的属性变量上等。</p>↵"'
      }
      this.loading = false
    },
    toList(type, id) {
      this.$router.push({
        name: 'articleList',
        params: {
          type: type,
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#article{
  position: relative;
  padding: 30px 10px;
  width: 100%;
  .article-warp{
    position: relative;
    animation: show .8s;
    padding: 30px;
    width: 100%;
    @media (max-width: 768px){
      padding: 30px 15px;
    }
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1);
    .article-message{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .article-title{
        font-size: 26px;
        @media (max-width: 768px){
          font-size: 22px;
        }
        font-weight: bold;
      }
      .article-info{
        font-size: 14px;
        @media (max-width: 768px){
          font-size: 12px;
        }
        margin: 20px 0px;
        color: #666666;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        .classify{
          color: #444444;
          border-bottom: 1px solid #e1e1e1;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          margin-right: 5px;
          &:hover{
            color: red;
          }
        }
        .iconfont{
          font-size: 14px;
          @media (max-width: 768px){
            font-size: 12px;
          }
          margin: 0 5px;
          &:first-child{
            margin-left: 0;
          }
        }
      }
      .article-sub-message{
        font-size: 14px;
        color: #999999;
        margin-bottom: 20px;
      }
    }
    .tags{
      width: 100%;
      padding: 10px 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: 1px solid #eeeeee;
      .tag{
        color: #fff;
        padding: 5px;
        background-color: #e1e1e1;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 5px;
        position: relative;
        margin-left: 10px;
        margin-top: 10px;
        line-height: 1;
        transition: all .3s;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        &:hover{
          &:before{
            border-right: 12px solid #e1e1e1;
          }
          background-color: red;
        }
        &:before{
          position: absolute;
          left: -9px;
          top: 0;
          width: 0;
          height: 0;
          content: "";
          border-top: 11px solid transparent;
          border-bottom: 11px solid transparent;
          border-right: 12px solid #e1e1e1;
          transition: all .3s;
        }
        .iconfont{
          font-size: 12px;
        }
      }
    }
  }
}
.slide-fade-enter-active{
  transition: all .3s ease;
}
.slide-fade-leave-active{
  transition: all .3s ease;
}
.slide-fade-enter
.slide-fade-leave-to{
  transform: translateY(20px);
  opacity: 0;
}
@keyframes show {
  from {
    margin-top: -10px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>
