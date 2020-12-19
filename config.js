var def_configs = {
        drive: {
                active: {
                        attribute_to_set: "checked",
                        val: true,
                },
                default_account: {
                        attribute_to_set: "value",
                        val: 2,
                },
                restrict_to_gmail: {
                        attribute_to_set: "checked",
                        val: true,
                },
                url_regexs: [{
                        regex: /(?<=https?:\/\/drive\.google\.com\/drive\/u\/)\d(?=.*)/,
                        replace_prefix: "",
                }, {
                        regex: /(?<=https?:\/\/drive\.google\.com\/)drive(?=.*)/,
                        replace_prefix: "drive/u/"
                }]
        },
        classroom: {
                active: {
                        attribute_to_set: "checked",
                        val: true,
                },
                default_account: {
                        attribute_to_set: "value",
                        val: 2,
                },
                restrict_to_gmail: {
                        attribute_to_set: "checked",
                        val: false,
                },
                url_regexs: [{
                        regex: /(?<=https?:\/\/classroom\.google\.com\/u\/)\d(?=.*)/,
                        replace_prefix: "",
                }]
        },
}

var openerRegexs = {
        gmail: [/(?<=https?:\/\/mail\.google\.com\/mail\/u\/)\d(?=.*)/]
}


export {
        def_configs,
        openerRegexs
};
