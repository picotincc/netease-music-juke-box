import NJUApplication from "../../nju/app/Application";

import PlayListView from "../view/PlayListView";
import TrackTableView from "../view/TrackTableView";
import PlayerView from "../view/PlayerView";


export default class Application extends NJUApplication
{

    init()
    {
        super.init();
        this.addStyleClass("nm-app");
        this._initLayout();
        this._initPlayListView();
        this._initTrackTableView();
        this._initPlayerView();
    }

    _initLayout()
    {
        this.$element.append(`
            <header><h1>网易云音乐</h1></header>
            <main>
                <aside class="sidebar"></aside>
                <section class="content"></section>
            </main>
            <footer></footer>
        `);
    }

    _initPlayListView()
    {
        this.playListView = new PlayListView("play-list");
        this.addSubView(this.playListView, this.$("> main > aside.sidebar"));
    }

    _initTrackTableView()
    {
        this.trackTableView = new TrackTableView("track-table");
        this.addSubView(this.trackTableView, this.$("> main > section.content"));
    }

    _initPlayerView()
    {
        this.playerView = new PlayerView("player");
        this.addSubView(this.playerView, this.$("> footer"));
    }

}
