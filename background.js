// change these values to change your default account
default_accounts = {
        "classroom": 2,
        "drive": 2,
}

for (key in default_accounts) {
        default_accounts[key] -= 1;
}


rules = [{
                reg: /(?<=https?:\/\/classroom\.google\.com\/u\/)\d(?=.*)/,
                openerReg: null,
                openerId: null,
                default_: default_accounts["classroom"],
        },

        {
                reg: /(?<=https?:\/\/drive\.google\.com\/drive\/u\/)\d(?=.*)/,
                openerReg: /(?<=https?:\/\/mail\.google\.com\/mail\/u\/)\d(?=.*)/,
                openerId: default_accounts["drive"],
                default_: default_accounts["drive"],
        },

        {
                reg: /(?<=https?:\/\/drive\.google\.com\/)drive(?=.*)/,
                openerReg: /(?<=https?:\/\/mail\.google\.com\/mail\/u\/)\d(?=.*)/,
                openerId: default_accounts["drive"],
                default_: "drive/u/" + default_accounts["drive"],
        },

];


function updateTab(tab) {

        chrome.tabs.get(tab.openerTabId || 1, (openerTab) => {
                //console.log(openerTab.url);
                for (rule of rules) {
                        if (rule.openerId) {
                                if (tab.openerTabId) {
                                        let res = rule.openerReg.exec(openerTab.url);
                                        console.log(res);
                                        if (!res || res[0] != rule.openerId) {
                                                continue;
                                        }
                                } else continue;
                        }

                        let res = rule.reg.exec(tab.url);
                        if (res) {
                                if (res[0] != rule.default_) {
                                        chrome.tabs.update(tab.id, {
                                                "url": tab.url.replace(rule.reg, rule.default_)
                                        }, () => {});
                                        break;
                                } else break;
                        }
                }
        });

}

chrome.tabs.onUpdated.addListener((tabid, chInfo, tab) => {
        updateTab(tab);
});
chrome.tabs.onCreated.addListener((tab) => {
        updateTab(tab);
});
