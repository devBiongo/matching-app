
export default class StringUtils {

    public static cloneObj = (obj: any) => {
        let newObj: any = {};
        if (obj instanceof Array) {
            newObj = [];
        }
        for (const key in obj) {
            const value = obj[key];
            newObj[key] = typeof value === 'object' ? this.cloneObj(value) : value;
        }
        return newObj;
    }

    public static getImgUrl = (avatarId: string) => {
        return `http://awlewis-document-storage.oss-ap-northeast-1.aliyuncs.com/${avatarId}`;
        // return `http://awlewis-document-storage.oss-ap-northeast-1.aliyuncs.com/${avatarId}?t=${new Date()}`;
    }

    public static getRealAge = (target: String) => {
        if (target && target.length >= 10) {
            const birArr = target.substring(0, 10).split("-");
            const birYear = Number(birArr[0]);
            const birMonth = Number(birArr[1]);
            const birDay = Number(birArr[2]);
            const today = new Date();
            const nowYear = today.getFullYear();
            const nowMonth = today.getMonth() + 1;
            const nowDay = today.getDate();
            let returnAge;
            const d = new Date(birYear, birMonth - 1, birDay);
            if (d.getFullYear() === birYear && (d.getMonth() + 1) === birMonth && d.getDate() === birDay) {
                if (nowYear === birYear) {
                    returnAge = 0; // 
                } else {
                    let ageDiff = nowYear - birYear; // 
                    if (ageDiff > 0) {
                        if (nowMonth === birMonth) {
                            let dayDiff = nowDay - birDay; // 
                            if (dayDiff < 0) {
                                returnAge = ageDiff - 1;
                            } else {
                                returnAge = ageDiff;
                            }
                        } else {
                            let monthDiff = nowMonth - birMonth; // 
                            if (monthDiff < 0) {
                                returnAge = ageDiff - 1;
                            } else {
                                returnAge = ageDiff;
                            }
                        }
                    } else {
                        return "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return returnAge;
            } else {
                return ("输入的日期格式错误！");
            }

        }

    }

    public static getFinalEducation = (code: String) => {
        switch (code) {
            case '1':
                return '初中';
            case '2':
                return '高中';
            case '3':
                return '大专';
            case '4':
                return '大学';
            case '5':
                return '硕士';
            case '6':
                return '博士';
            default:
                return '';
        }
    }

    public static getAnnualIncome = (code: String) => {
        switch (code) {
            case '1':
                return '200万~300万';
            case '2':
                return '300万~500万';
            case '3':
                return '500万~1000万';
            case '4':
                return '1000万以上';
            default:
                return '';
        }
    }

    public static isEvenNum(num: number){
        return num%2===0;
    }

    public static isThrTimes(num: number){
        return num%3===0;
    }

}