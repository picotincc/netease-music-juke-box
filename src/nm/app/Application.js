import NJUApplication from "../../nju/app/Application";

import PlayListView from "../view/PlayListView";

export default class Application extends NJUApplication {

    init() {
        super.init();
        this.addStyleClass("nm-app");
        this._initLayout();
        this._initPlayListView();
    }

    _initLayout() {
        this.$element.append(`
            <header><h1>网易云音乐</h1></header>
            <main>
                <aside></aside>
                <section class="content"></section>
            </main>
            <footer></footer>
        `);
    }

    _initPlayListView() {
        this.playListView = new PlayListView("play-list");
        this.addSubView(this.playListView, this.$("> main > aside"));
    }


    run() {
        console.log("Netease Music Webapp is now running...");
    }
}
