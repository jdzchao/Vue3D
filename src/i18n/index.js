import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCNLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementZhTWLocale from 'element-ui/lib/locale/lang/zh-TW'// element-ui lang
import enLocale from './lang/en'
import zhCNLocale from './lang/zh-CN'
import zhTWLocale from './lang/zh-TW'

Vue.use(VueI18n)
// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'en' || navLang === 'zh-CN') ? navLang : false
let lang = Cookies.get('language') || localLang || 'zh-CN'

const messages = {
    "en": {...enLocale, ...elementEnLocale},
    "zh-CN": {...zhCNLocale, ...elementZhCNLocale},
    "zh-TW": {...zhTWLocale, ...elementZhTWLocale}
}

const i18n = new VueI18n({
    locale: lang,
    messages
})

export default i18n