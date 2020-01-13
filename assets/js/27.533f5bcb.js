(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{252:function(t,e,n){"use strict";n.r(e);var a=n(0),o=Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("blockquote",[n("p",[t._v("本文探讨：当遇到大量数据时，如何才能在不卡主页面的情况下渲染数据，以及其背后的原理。以下比较了4种不同的方式：")])]),t._v(" "),n("ol",[n("li",[t._v("暴力渲染")]),t._v(" "),n("li",[t._v("setTimeout")]),t._v(" "),n("li",[t._v("requestAnimationFrame")]),t._v(" "),n("li",[t._v("DocumentFragment")])]),t._v(" "),n("h3",{attrs:{id:"暴力渲染"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#暴力渲染","aria-hidden":"true"}},[t._v("#")]),t._v(" 暴力渲染")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("// 记录任务开始时间\nlet now = Date.now();\n// 插入十万条数据\nconst total = 100000;\n// 获取容器\nlet ul = document.getElementById('container');\n// 将数据插入容器中\nfor (let i = 0; i < total; i++) {\n    let li = document.createElement('li');\n    li.innerText = ~~(Math.random() * total)  // ~~\n    ul.appendChild(li);\n}\n\nconsole.log('JS运行时间：',Date.now() - now);\nsetTimeout(()=>{\n  console.log('总运行时间：',Date.now() - now);\n},0)\n// print: JS运行时间： 187ms\n// print: 总运行时间： 2844ms\n")])])]),n("blockquote",[n("p",[t._v("简单说明一下，为何两次console.log的结果时间差异巨大，并且是如何简单来统计JS运行时间和总渲染时间：")])]),t._v(" "),n("blockquote",[n("p",[t._v("在 JS 的Event Loop中，当JS引擎所管理的执行栈中的事件以及所有微任务事件全部执行完后，才会触发渲染线程对页面进行渲染")])]),t._v(" "),n("ul",[n("li",[t._v("第一个console.log的触发时间是在页面进行渲染之前，此时得到的间隔时间为JS运行所需要的时间")]),t._v(" "),n("li",[t._v("第二个console.log是放到 setTimeout 中的，它的触发时间是在渲染完成，在下一次Event Loop中执行的")])]),t._v(" "),n("p",[n("strong",[t._v("结果：页面卡顿，是由于同时渲染大量DOM所引起的，所以下面考虑将渲染过程分批进行：")])]),t._v(" "),n("h3",{attrs:{id:"settimeout"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#settimeout","aria-hidden":"true"}},[t._v("#")]),t._v(" setTimeout")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("//需要插入的容器\nlet ul = document.getElementById('container');\n// 插入十万条数据\nlet total = 100000;\n// 一次插入 20 条\nlet once = 20;\n//总页数\nlet page = total/once\n//每条记录的索引\nlet index = 0;\n//循环加载数据\nfunction loop(curTotal,curIndex){\n    if(curTotal <= 0){\n        return false;\n    }\n    //每页多少条\n    let pageCount = Math.min(curTotal , once);\n    setTimeout(()=>{\n        for(let i = 0; i < pageCount; i++){\n            let li = document.createElement('li');\n            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)\n            ul.appendChild(li)\n        }\n        loop(curTotal - pageCount,curIndex + pageCount)\n    },0)\n}\nloop(total,index);\n")])])]),n("p",[n("strong",[t._v("导致结果：渲染加快但是有白屏或闪屏现象")])]),t._v(" "),n("h5",{attrs:{id:"闪屏原因"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#闪屏原因","aria-hidden":"true"}},[t._v("#")]),t._v(" 闪屏原因")]),t._v(" "),n("blockquote",[n("ul",[n("li",[n("strong",[t._v("FPS")]),t._v("：表示的是每秒钟画面更新次数，是描述帧变化速度的物理量。")])])]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("FPS为60frame/s")]),t._v("：大多显示器会以每秒60次的频率，不断的更新屏幕上的图像。")]),t._v(" "),n("li",[n("strong",[t._v("16.7ms")]),t._v("：根据视觉暂留现象，最平滑动画的最佳循环间隔是1000ms/60，约等于16.7ms。")])]),t._v(" "),n("h5",{attrs:{id:"settimeout与闪屏的关系-刷新步调可能会-不一致"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#settimeout与闪屏的关系-刷新步调可能会-不一致","aria-hidden":"true"}},[t._v("#")]),t._v(" setTimeout与闪屏的关系 -> 刷新步调可能会 不一致")]),t._v(" "),n("blockquote",[n("ul",[n("li",[t._v("setTimeout的执行时间并不是确定的。实际执行时间可能会比其设定的时间晚一些。")])])]),t._v(" "),n("ul",[n("li",[t._v("刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的刷新频率可能会不同，而setTimeout只能设置一个固定时间间隔，这个时间不一定和屏幕的刷新时间相同。")])]),t._v(" "),n("p",[t._v("以上两种情况都会导致setTimeout的执行步调和屏幕的"),n("strong",[t._v("刷新步调不一致")]),t._v("。\n在setTimeout中对dom进行操作，必须要等到屏幕下次绘制时才能更新到屏幕上，如果两者步调不一致，就"),n("strong",[t._v("可能导致中间某一帧的操作被跨越过去")]),t._v("，而直接更新下一帧的元素，从而"),n("strong",[t._v("导致丢帧现象")]),t._v("。")]),t._v(" "),n("h3",{attrs:{id:"requestanimationframe（不会产生丢帧现象）"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#requestanimationframe（不会产生丢帧现象）","aria-hidden":"true"}},[t._v("#")]),t._v(" requestAnimationFrame（不会产生丢帧现象）")]),t._v(" "),n("p",[t._v("requestAnimationFrame是系统来决定回调函数的执行时机。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象。")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("//需要插入的容器\nlet ul = document.getElementById('container');\n// 插入十万条数据\nlet total = 100000;\n// 一次插入 20 条\nlet once = 20;\n//总页数\nlet page = total/once\n//每条记录的索引\nlet index = 0;\n//循环加载数据\nfunction loop(curTotal,curIndex){\n    if(curTotal <= 0){\n        return false;\n    }\n    //每页多少条\n    let pageCount = Math.min(curTotal , once);\n    window.requestAnimationFrame(function(){\n        for(let i = 0; i < pageCount; i++){\n            let li = document.createElement('li');\n            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)\n            ul.appendChild(li)\n        }\n        loop(curTotal - pageCount,curIndex + pageCount)\n    })\n}\nloop(total,index);\n\n")])])]),n("p",[n("strong",[t._v("结果：很流畅，没有出现闪烁丢帧的现象，但还能再优化")])]),t._v(" "),n("h3",{attrs:{id:"使用-documentfragment"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用-documentfragment","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用 DocumentFragment")]),t._v(" "),n("blockquote",[n("ul",[n("li",[t._v("DocumentFragment，文档片段接口，它被作为一个轻量版的 Document 使用。DocumentFragments是DOM节点，但并不是\tDOM树的一部分，可以认为是存在内存中的，所以将子元素插入到文档片段时不会引起页面回流。可以用于避免回流操作。")])])]),t._v(" "),n("ul",[n("li",[t._v("可以使用document.createDocumentFragment 方法或者构造函数来创建一个空的 DocumentFragment.")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("//需要插入的容器\nlet ul = document.getElementById('container');\n// 插入十万条数据\nlet total = 100000;\n// 一次插入 20 条\nlet once = 20;\n//总页数\nlet page = total/once\n//每条记录的索引\nlet index = 0;\n//循环加载数据\nfunction loop(curTotal,curIndex){\n    if(curTotal <= 0){\n        return false;\n    }\n    //每页多少条\n    let pageCount = Math.min(curTotal , once);\n    window.requestAnimationFrame(function(){\n        let fragment = document.createDocumentFragment();\n        for(let i = 0; i < pageCount; i++){\n            let li = document.createElement('li');\n            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)\n            fragment.appendChild(li)\n        }\n        ul.appendChild(fragment)\n        loop(curTotal - pageCount,curIndex + pageCount)\n    })\n}\nloop(total,index);\n")])])]),n("h3",{attrs:{id:"使用-display"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用-display","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用 display")]),t._v(" "),n("p",[t._v("可以先将元素脱离文档流、对其修改、在带回文档流，比如 display:none，添加修改完最后 在display: block")]),t._v(" "),n("p",[t._v("参考链接："),n("a",{attrs:{href:"https://juejin.im/post/5d76f469f265da039a28aff7",target:"_blank",rel:"noopener noreferrer"}},[t._v("高性能渲染十万条数据"),n("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=o.exports}}]);