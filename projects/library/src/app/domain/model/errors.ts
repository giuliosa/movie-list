import { MessageHolder, MessageType } from 'projects/library/src/app/domain/model/message'

export abstract class BaseError implements Error, MessageHolder {
  public messageType: MessageType = MessageType.Error

  public get messageParameters(): Array<any> {
    return this.parameters ? this.parameters : []
  }

  protected constructor(
    public name: string,
    public message: string,
    private parameters?: Array<any>,
    public stack?: string,
  ) {}
}

export class InvalidationReason implements MessageHolder {
  public static error(reason: string, ...params: any[]) {
    return new InvalidationReason(MessageType.Error, reason, params)
  }

  public static warn(reason: string, ...params: any[]) {
    return new InvalidationReason(MessageType.Warning, reason, params)
  }

  public get messageParameters(): Array<any> {
    return this.parameters ? this.parameters : []
  }

  constructor(
    public messageType: MessageType,
    public message: string,
    private parameters?: Array<any>,
  ) {}
}

export class ValidationError implements Error {
  public static fromResult(result: ValidationResult) {
    const error = new ValidationError()

    error.validationMessages = result.reasons

    return error
  }

  /* Error implementation */
  public readonly name = ValidationError.name
  public readonly message: string
  public readonly stack?: string

  private validationMessages: Array<InvalidationReason>

  constructor() {
    this.validationMessages = new Array<InvalidationReason>()
  }

  public addWarning(message: string, messageParameters?: Array<any>): ValidationError {
    return this.addReason(new InvalidationReason(MessageType.Warning, message, messageParameters))
  }

  public addError(message: string, messageParameters?: Array<any>): ValidationError {
    return this.addReason(new InvalidationReason(MessageType.Error, message, messageParameters))
  }

  public addReason(reason: InvalidationReason): ValidationError {
    this.validationMessages.push(reason)
    return this
  }

  public addReasons(reasons: Array<InvalidationReason>): ValidationError {
    this.validationMessages = this.validationMessages.concat(reasons)
    return this
  }

  public reasons(): Array<InvalidationReason> {
    return this.validationMessages.map(f => f) // security copy
  }
}

export class PropertyInvalidationReason extends InvalidationReason {
  public static error(className: string, propertyName: string, reason: string, ...params: any[]) {
    return new PropertyInvalidationReason(
      MessageType.Error,
      className,
      propertyName,
      reason,
      params,
    )
  }

  public static warn(className: string, propertyName: string, reason: string, ...params: any[]) {
    return new PropertyInvalidationReason(
      MessageType.Warning,
      className,
      propertyName,
      reason,
      params,
    )
  }

  constructor(
    messageType: MessageType,
    className: string, // in CAPS case
    propertyName: string, // in CAPS case
    reason: string, // in CAPS case
    parameters?: Array<any>,
  ) {
    super(messageType, `INVALID.${className}.${propertyName}.${reason}`, parameters)
  }
}

export class ValidationResult {
  private invalidationReasons = new Array<InvalidationReason>()

  public get reasons(): Array<InvalidationReason> {
    return this.invalidationReasons.map(r => r) // security copy
  }

  public get isValid() {
    return this.invalidationReasons.length === 0
  }

  public addError(message: string, messageParameters?: Array<any>): ValidationResult {
    return this.addReason(new InvalidationReason(MessageType.Error, message, messageParameters))
  }

  public addWarning(message: string, messageParameters?: Array<any>): ValidationResult {
    return this.addReason(new InvalidationReason(MessageType.Warning, message, messageParameters))
  }

  public addReason(reason: InvalidationReason): ValidationResult {
    this.invalidationReasons.push(reason)
    return this
  }

  public merge(other: ValidationResult): ValidationResult {
    const newResult = new ValidationResult()

    if (this.invalidationReasons.length > 0) {
      newResult.invalidationReasons.push(...this.invalidationReasons)
    }
    if (other.invalidationReasons.length > 0) {
      newResult.invalidationReasons.push(...other.invalidationReasons)
    }

    return newResult
  }
}

export class ConflictError extends BaseError {
  constructor(message: string, messageParameters?: Array<any>) {
    super(ConflictError.name, message, messageParameters)
  }
}

export class ServiceUnavailableError extends BaseError {
  constructor(message: string, messageParameters?: Array<any>) {
    super(ServiceUnavailableError.name, message, messageParameters)
  }
}

export class UnknownError extends BaseError {
  constructor(message: string, messageParameters?: Array<any>) {
    super(UnknownError.name, message, messageParameters)
  }
}

export class NotAuthorizedError extends BaseError {
  constructor(public innerError?: Error) {
    super(NotAuthorizedError.name, 'ERROR.USER.NOT_AUTHORIZED')

    if (innerError) {
      this.stack = innerError.name
    }
  }
}

export class OfflineError extends BaseError {
  constructor() {
    super(OfflineError.name, 'ERROR.USER.OFF_LINE')
    this.messageType = MessageType.Warning
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, messageParameters?: Array<any>) {
    super(NotFoundError.name, message, messageParameters)
    this.messageType = MessageType.Error
  }
}

export class GatewayTimeoutError extends BaseError {
  constructor() {
    super(GatewayTimeoutError.name, 'ERROR.GATEWAY_TIMEOUT')
    this.messageType = MessageType.Warning
  }
}
