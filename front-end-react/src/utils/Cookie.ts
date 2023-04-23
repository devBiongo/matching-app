

export default class Cookie {

    public static set(key: string, value: any, exdays?: number) {
        const exdate = new Date() // 获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * (exdays===undefined?7:exdays)) // 保存的天数
        window.document.cookie = key + '=' + value + ';path=/;expires=' + exdate.toString();
    }


    //获取cookie
    public static get(key: string) {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
            for (let i = 0; i < arr.length; i++) {
                let arr2 = arr[i].split('=') // 再次切割
                // 判断查找相对应的值
                if (arr2[0] === key) {
                    return arr2[1]
                }
            }
        }
    }

    // 清除cookie
    public static remove(key: string) {
        this.set(key, '', -1);
    }
}
