import NJUApplication from "../../nju/app/Application";

export default class Application extends NJUApplication {

    init() {
        super.init();
        this.addStyleClass("nm-application");
    }

    run() {
        console.log("Netease Music Webapp is now running...");
    }
}
