import { describe, it, expect } from 'vitest';
import { isFetchBaseQueryError, isErrorWithMessage } from './errorGuards';

describe('isFetchBaseQueryError', () => {
  it('returns true when object has a status property', () => {
    expect(isFetchBaseQueryError({ status: 404 })).toBe(true);
    expect(isFetchBaseQueryError({ status: 'FETCH_ERROR' })).toBe(true);
  });

  it('returns false when object does not have a status property', () => {
    expect(isFetchBaseQueryError({})).toBe(false);
    expect(isFetchBaseQueryError({ message: 'error' })).toBe(false);
  });

  it('returns false when value is not an object', () => {
    expect(isFetchBaseQueryError(null)).toBe(false);
    expect(isFetchBaseQueryError(undefined)).toBe(false);
    expect(isFetchBaseQueryError('string')).toBe(false);
  });
});

describe('isErrorWithMessage', () => {
  it('returns true when object has a message property of type string', () => {
    expect(isErrorWithMessage({ message: 'error happened' })).toBe(true);
  });

  it('returns false when object lacks a message property or message is not a string', () => {
    expect(isErrorWithMessage({})).toBe(false);
    expect(isErrorWithMessage({ message: 123 })).toBe(false);
  });

  it('returns false when value is not an object', () => {
    expect(isErrorWithMessage(null)).toBe(false);
    expect(isErrorWithMessage(undefined)).toBe(false);
    expect(isErrorWithMessage(123)).toBe(false);
  });
});
