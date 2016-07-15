import NJUApplication from "../../nju/app/Application";

import PlayerView from "../view/PlayerView";
import PlayListView from "../view/PlayListView";
import SearchView from "../view/SearchView";
import TrackTableView from "../view/TrackTableView";



export default class Application extends NJUApplication
{

    init()
    {
        super.init();
        this.addStyleClass("nm-app");
        this._initLayout();
        this._initPlayerView();
        this._initPlayListView();
        this._initSearchView();
        this._initTrackTableView();

    }

    _initLayout()
    {
        this.$element.append(`
            <header><div class="logo"></div><h1>网易云音乐</h1></header>
            <main>
                <aside class="sidebar"></aside>
                <section class="content"></section>
            </main>
            <footer></footer>
        `);
    }

    _initPlayerView()
    {
        this.playerView = new PlayerView("player");
        this.addSubView(this.playerView, this.$("> footer"));
    }

    _initPlayListView()
    {
        this.playListView = new PlayListView("play-list");
        this.addSubView(this.playListView, this.$("> main > aside.sidebar"));
    }

    _initSearchView()
    {
        this.searchView = new SearchView("search-view");
        this.addSubView(this.searchView, this.$("> header"));
    }

    _initTrackTableView()
    {
        this.trackTableView = new TrackTableView("track-table");
        this.addSubView(this.trackTableView, this.$("> main > section.content"));
    }


}
