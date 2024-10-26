
export function PUBLIC_URL(path) {
    if (path.indexOf('http') !== -1) {
        path = path.substring(0)
        return path;
    }
    if (path.startsWith('/'))
        path = path.substring(1);
    if (path.endsWith('/'))
        path = path.substring(0, path.length - 1);
    return process.env.PUBLIC_URL + '/' + path;
}
export function BG_URL(path) {
    return `url(` + path + ')';
}
export function isJsonString(str) {
    if (str === undefined || typeof (str) !== 'string')
        return false;
    var check = (str.indexOf("{") !== -1 && str.indexOf("}") !== -1) || (str.indexOf("[") !== -1 && str.indexOf("]") !== -1);
    if (!check)
        return false;
    try {
        JSON.parse(str);
        return true;
    }
    catch (e) {
        return false;
    }
}
export function handleJsonFieldsWith(obj, fields) {
    for (var i = 0; i < fields.length; i++) {
        // console.log(fields[i]);
        // console.log(obj[fields[i]]);
        if (isJsonString(obj[fields[i]]))
            obj[fields[i]] = JSON.parse(obj[fields[i]]);
    }
    return obj;
}
export function isEmptyString(str) {
    return (str === undefined || str == null || str === '' || str === '?' || str.length === 0 || (Object.keys(str).length === 0 && str.constructor === Object));
}
export function isUrlValid(url) {
    const reg = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g
    let isValid = reg.test(String(url));
    return isValid
}
export function emailValidator(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email));
    return isValid
}
export function validatePhone(phone) {
    const re = /^0[0-9]{2,}[0-9]{7,}$/;
    const testMobile = re.test(String(phone));
    if (testMobile)
        return true
    else {
        return false
    }
}
export function validateMobilePhone(phone) {
    if (phone.indexOf('09') === -1) {
        return false
    }
    else {
        const re = /^(\+98|0098|98|0)?9\d{9}$/g;
        const testMobile = re.test(String(phone));
        if (testMobile)
            return true
        else {
            return false
        }
    };
}
export function validatePassword(p) {
    let errors = [];
    if (p.length < 6) {
        errors.push("رمز عبور باید بیشتر از ۶ حرف باشد");
    }
    if (p.search(/[a-z]/) < 0) {
        errors.push("رمز عبور باید حداقل یک حرف کوچک داشته باشد.")
    }
    if (p.search(/[A-Z]/) < 0) {
        errors.push("رمز عبور باید حداقل یک حرف بزرگ داشته باشد.")
    }
    if (p.search(/[0-9]/) < 0) {
        errors.push("رمز عبور باید حداقل یک عدد داشته باشد.");
    }
    if (p.search(/.*[!@#$%^&*() =+_-]/) < 0) {
        errors.push("رمز عبور باید حداقل یک حرف خاص داشته باشد.");
    }
    return errors;
}

export const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            val => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
            error => hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};
export function findInArray(arr, query = ['key', 'value'], all = false) {
    var result = all ? [] : undefined;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][query[0]] === query[1]) {
            if (all)
                result.push(arr[i]);
            else
                return arr[i];
        }
    }
    return result;
}
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getDevice() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        deviceType = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        deviceType = 'WEB_APP';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        deviceType = 'IOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        deviceType = 'WEB_APP';
    } else if (/Android/.test(userAgent)) {
        deviceType = 'ANDROID';
    } else if (/Linux/.test(platform)) {
        deviceType = 'WEB_APP';
    }
    else deviceType = "PANEL"
    return deviceType;
}
export const uuidGenerator = () => {
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    return uid
}
export const isLogin = (ctx) => {
    return ctx.user && ctx.user.hasOwnProperty('id') && new RegExp('^[0-9a-fA-F]{24}$').test(ctx.user.id ?? '');
};

export const handleChange = (e, state, setState) => {
    let _state = { ...state }
    _state[e.target.name] = e.target.value
    setState(_state)
}
export const delay = (ms = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}