import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const dateFormat = 'YYYY-MM-DD';
dayjs.extend(customParseFormat);

export const test2023 = {
    realName:'蔡徐坤',
    gender:'',
    height:'175',
    finalEducation:'3',
    birthday: dayjs('1990-02-02', dateFormat),
    birthplace:'江苏',
    residence:'东京',
    visaType:'国际贸易',
    occupation:'工程师',
    annualIncome:'4',
    maritalStatus:'0',
    wechatNum:'cuyinvai',
    phoneNum:'13962775664',
    privateFlag:'1',
    selfIntroduction:'全民制作人们大家好,我是练习时长两年半的个人练习生蔡徐坤, 喜欢唱,跳,rap,篮球,music~',
    requireAgeFrom: '18',
    requireAgeTo: '20',
    requireHeightFrom: '175',
    requireHeightTo: '180',
    requireMaritalStatus: '1',
    requireAnnualIncome: '3',
    requireFinalEducation: '6',
    requireNuisance: '没有介意的地方'
} 