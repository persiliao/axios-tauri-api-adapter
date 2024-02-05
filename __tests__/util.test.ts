import { buildRequestUrl, buildTauriRequestData } from './../src/util';
import { TauriBodyType } from '../src/constants';

test('only baseURL', () => {
  expect(buildRequestUrl({ baseURL: 'https://www.persiliao.com' })).toBe('https://www.persiliao.com')
})

test('only url', () => {
  expect(buildRequestUrl({ url: 'https://www.persiliao.com' })).toBe('https://www.persiliao.com')
})

test('only url with params', () => {
  expect(buildRequestUrl({ url: 'https://www.persiliao.com?foo=bar' })).toBe('https://www.persiliao.com?foo=bar')
})

test('only url with params & config.params', () => {
  expect(buildRequestUrl({ url: 'https://www.persiliao.com?foo=bar', params: { 'name': 'PersiLiao'} })).toBe('https://www.persiliao.com?foo=bar&name=PersiLiao')
})

test('only url & params', () => {
  expect(buildRequestUrl({ url: 'https://www.persiliao.com', params: { 'foo': 'bar' } })).toBe('https://www.persiliao.com?foo=bar')
})


test('data payload with correct type', () => {

  // Tuples containing the value and its expected Tauri body type.
  const payloads: [unknown, TauriBodyType | undefined][] = [
    [
      "banana!", 
      TauriBodyType.TEXT
    ],
    [
      { id: 1, name: "Banana", }, 
      TauriBodyType.JSON
    ],
    [
      new FormData, 
      TauriBodyType.FORM
    ],
    [
      new Uint32Array, 
      TauriBodyType.BYTES
    ],
    [
      new Float32Array, 
      TauriBodyType.BYTES
    ],
    [
      new BigInt64Array, 
      TauriBodyType.BYTES
    ],
    [
      [1, 2, 3], 
      TauriBodyType.JSON
    ],
    [
      ["THE WORLD"], 
      TauriBodyType.JSON
    ],
    [
      null, 
      undefined
    ],
    [
      undefined, 
      undefined
    ],
    [
      Symbol("foo"),
      undefined,
    ]
  ];

  for (const [value, expectedBodyType] of payloads) {
    const body = buildTauriRequestData(value);
    expect(body?.type).toBe(expectedBodyType);
  }
})