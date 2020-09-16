import express from 'express';
import path from 'path';
import {ExpressRouter} from '../definitions';


export class Server {
  app: any;
  vhost: string;
  port: number

  constructor(vhost: string, port: number){
    this.port = port;
    this.vhost = vhost;
    this.app = express();
    this.configure()
  }

  configure(): void {
    this.app.use(express.json({limit: '50mb'}));
    //this.app.use(express.urlencoded({limit: '50mb'}));
  }

  start(): void {
    this.app.listen(this.port, ()=> {
      console.log(`Server iniciado em http://${this.vhost}:${this.port}/`)
    })
  }

  registerRoutes(expressRouters: ExpressRouter[]): void {
    expressRouters.map(expressRouter => {
      this.app.use(expressRouter.routeName, expressRouter.router)
    });
  }

  registerMiddleware(middleware: any): void {
    this.app.use(middleware);
  }

  enableCors(corsMiddleware: any): void {
    this.app.use(corsMiddleware)
    this.app.options('*', corsMiddleware)
  }

}