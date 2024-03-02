export class Payment {
    constructor(
      readonly id: number,
      readonly name: string,
      readonly concept: string,
      readonly total: number,
      readonly paydate: string
    ) {}
  }
  