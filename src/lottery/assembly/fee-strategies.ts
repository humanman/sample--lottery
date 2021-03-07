import { u128 } from "near-sdk-as";

export enum StrategyType {
  constant = 0 as u8,
  linear = 1 as u8,
  exponential = 2 as u8,
}

export class Strategy {

  static selector(strategy: StrategyType, scalar: u32, base: u128): u128 {
    switch (strategy) {
      case StrategyType.exponential:
        return this.exponential(scalar, base)

      case StrategyType.linear:
        return this.linear(scalar, base)

      case StrategyType.constant:
        return this.constant(scalar, base)

      default:
        assert(false, "Must provide a valid fee strategy")
        return u128.Zero
    }
  }

  static constant(scalar: u32, base: u128): u128 {
    return base
  }

  static linear(scalar: u32, base: u128): u128 {
    return u128.mul(base, u128.from(scalar))
  }

  static exponential(scalar: u32, base: u128): u128 {
    const scalar_as_u128 = u128.from(scalar);
    return u128.mul(base, u128.mul(scalar_as_u128, scalar_as_u128));
  }
}
