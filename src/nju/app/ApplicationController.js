import Application from "./Application";
import ViewController from "../view/ViewController";

export default class ApplicationController extends ViewController
{
    get application()
    {
        return this.view;
    }

    createView(options = {})
    {
        return this.createApplication(options);
    }

    createApplication(options = {})
    {
        return new Application();
    }

    run()
    {

    }
}
