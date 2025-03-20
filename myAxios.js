/**
 * 基于promise+XHR封装myAxios函数，获取省份列表展示
 * 1.定义myAxios函数，接收配置对象，，返回Promise对象
 * 2.发起XHR请求，默认方法为GET
 * 3.调用成功/失败的处理程序
 * 4.使用myAxios函数，获取省份列表展示
 */

// 1.定义myAxios函数，接收配置对象，，返回Promise对象
function myAxios(config){
    return new Promise((resolve, reject) => {
        //2.发起XHR请求，默认方法为GET
        const xhr = new XMLHttpRequest()
        xhr.open(config.method || 'GET', config.url)
        xhr.addEventListener('loadend', () => {
            //3.调用成功/失败的处理程序
            if(xhr.status >= 200 && xhr.status.status < 300){
                resolve(JSON.parse(xhr.response))
            }else{
                reject(new Error(xhr.response))
            }
        })
        xhr.send()
    })
}

//4.使用myAxios函数，获取省份列表展示
myAxios({
    url: 'http//...'
}).then(result => {
    console.log(result)
    document.querySelector('.my-p').innerHTML = result.list.join('<br>')
}).catch(error => {
    console.log(error)
    document.querySelector('.my-p').innerHTML = error.message
})


//支持传递查询参数，获取地区列表
/**
 * 1.myAxios函数调用后，传入params选项
 * 2.基于URLSearchParams转换查询参数字符串
 * 3.使用自己封装的myAxios函数展示地区列表
*/

function myAxios(config){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        //1.判断有params选项，携带查询参数
        if(config.params){
            //2.使用URLSearchParams转换，并携带到url上
            const paramsObj = new URLSearchParams(config.params)
            const queryString = paramsObj.toString()
            //拼接
            config.url += `?${queryString}`
        }

        xhr.open(config.method || 'GET', config.url)
        xhr.addEventListener('loadend', () => {
            if(xhr.status >= 200 && xhr.status.status < 300){
                resolve(JSON.parse(xhr.response))
            }else{
                reject(new Error(xhr.response))
            }
        })
        xhr.send()
    })
}

//3.使用自己封装的myAxios函数展示地区列表
myAxios({
    url: 'http//...',
    params: {
        pname: '辽宁省',
        cname: '大连市'
    }
}).then(result => {
    console.log(result)
    document.querySelector('.my-p').innerHTML = result.list.join('<br>')
}).catch(error => {
    console.log(error)
    document.querySelector('.my-p').innerHTML = error.message
})

/**
 * 支持传递请求体数据，完成注册用户功能
 * 1.myAxios函数调用后，判断data选项
 * 2.转换数据类型，在send方法中发送
 * 3.使用自己封装的myAxios完成注册用户功能
 */

function myAxios(config){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        if(config.params){
            const paramsObj = new URLSearchParams(config.params)
            const queryString = paramsObj.toString()
            config.url += `?${queryString}`
        }

        xhr.open(config.method || 'GET', config.url)
        xhr.addEventListener('loadend', () => {
            if(xhr.status >= 200 && xhr.status.status < 300){
                resolve(JSON.parse(xhr.response))
            }else{
                reject(new Error(xhr.response))
            }
        })
        //1.判断有data选项，携带请求体
        if(config.data){
            //2.转换数据类型，在send中发送
            const jsonStr = JSON.stringify(config.data)
            xhr.setRequestHeader('Content-Type'. 'application/json')
            xhr.send(jsonStr)
        }else{
            //如果没有请求体数据，正常发起请求
            xhr.send()
        }
    })
}

document.querySelector('.reg-btn').addEventListener('click', () => {
    //3.使用自己封装的myAxios完成注册用户功能
    myAxios({
        url: 'http//...',
        method: 'POST',
        data: {
            username: '111',
            password: '123456'
        }
    }).then(result => {
        console.log(result)
        document.querySelector('.my-p').innerHTML = result.list.join('<br>')
    }).catch(error => {
        console.log(error)
        document.querySelector('.my-p').innerHTML = error.message
    })
})


