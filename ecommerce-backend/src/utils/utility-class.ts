class ErrorHandler extends Error{
  constructor(public message:string,public statusCode:number){
    super(message);/*super(message) is called, invoking the Error class's constructor with the provided error message.*/
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;