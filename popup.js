document.addEventListener('DOMContentLoaded', intializeHtml, false);
var things_to_store = [{
        id_: 'drive_inp',
        default_val: 2,
        attribute_to_set: "value",
}, {
        id_: "drive_restricted",
        default_val: true,
        attribute_to_set: "checked",
}, {
        id_: "drive_on",
        default_val: true,
        attribute_to_set: "checked",
}, {
        id_: 'classroom_inp',
        default_val: 2,
        attribute_to_set: "value",
}, {
        id_: "classroom_restricted",
        default_val: false,
        attribute_to_set: "checked",
}, {
        id_: "classroom_on",
        default_val: false,
        attribute_to_set: "checked",
}, ];

function intializeHtml() {
        let def_values = {};
        for (thing of things_to_store) {
                def_values[thing.id_] = thing.default_val;
        }
        chrome.storage.sync.get(def_values, (res) => {
                for (thing of things_to_store) {
                        if (document.getElementById(thing.id_))
                                document.getElementById(thing.id_).setAttribute(thing.attribute_to_set, res[thing.id_]);
                        else {
                                if (document.getElementById("placeholder_" + thing.id_)) {
                                        var ele = document.createElement("input");
                                        ele.setAttribute(thing.attribute_to_set, res[thing.id_]);
                                        ele.setAttribute("id", thing.id_);
                                        ele.setAttribute("type", "checkbox");
                                        ele.addEventListener("change", saveChange);
                                        document.getElementById("placeholder_" + thing.id_).appendChild(ele);

                                }

                        }
                }

        });
}

function saveChange(id) {
        for (thing of things_to_store) {
                if (thing.id_ == id) {
                        chrome.storage.sync.set({
                                id: document.getElementById(id)[thing.attribute_to_set]
                        }, () => {});
                        break;
                }
        }
}
