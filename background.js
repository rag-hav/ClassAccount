import {
        def_configs,
        openerRegexs
} from "/config.js";
var configs = def_configs;

function checkAndRedirect(tab) {
        chrome.tabs.get(tab.openerTabId || tab.id, (openerTab) => {
                for (let serviceKey in configs) {
                        let service = configs[serviceKey];
                        if (service.active.val) {

                                //if the service is restricted then we check the opener tab
                                //and skip the service if it doesnt match
                                if (service.restrict_to_gmail.val) {
                                        if (tab.openerTabId) {
                                                let flag = 0;
                                                for (let openerRegex of openerRegexs.gmail) {
                                                        let res = openerRegex.exec(openerTab.url);
                                                        if (!res || res[0] != service.default_account.val - 1) {
                                                                flag = 1;
                                                                break;
                                                        }
                                                }
                                                if (flag) continue;
                                        } else continue;
                                }

                                for (let urlRegexObj of service.url_regexs) {
                                        let res = urlRegexObj.regex.exec(tab.url);
                                        if (res) {
                                                if (res[0] != service.default_account.val - 1) {
                                                        chrome.tabs.update(tab.id, {
                                                                "url": tab.url.replace(urlRegexObj.regex, urlRegexObj
                                                                        .replace_prefix + String(service
                                                                                .default_account.val - 1))
                                                        }, () => {});
                                                        break;
                                                } else break;
                                        }
                                }
                        }
                }
        });
}

chrome.runtime.onMessage.addListener((msg) => {
        if (msg.reload) {
                chrome.storage.sync.get(configs, (res) => {
                        configs = res;
                });
        }
});

chrome.tabs.onUpdated.addListener((tabid, chInfo, tab) => {
        checkAndRedirect(tab);
});

chrome.tabs.onCreated.addListener((tab) => {
        checkAndRedirect(tab);
});
