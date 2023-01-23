import { buillRequestUrl } from './../src/util'

test('only baseURL', () => {
  expect(buillRequestUrl({ baseURL: 'https://www.persiliao.com' })).toBe('https://www.persiliao.com')
})

test('only url', () => {
  expect(buillRequestUrl({ url: 'https://www.persiliao.com' })).toBe('https://www.persiliao.com')
})

test('only url with params', () => {
  expect(buillRequestUrl({ url: 'https://www.persiliao.com?foo=bar' })).toBe('https://www.persiliao.com?foo=bar')
})

test('only url with params & config.params', () => {
  expect(buillRequestUrl({ url: 'https://www.persiliao.com?foo=bar', params: { 'name': 'PersiLiao'} })).toBe('https://www.persiliao.com?foo=bar&name=PersiLiao')
})

test('only url & params', () => {
  expect(buillRequestUrl({ url: 'https://www.persiliao.com', params: { 'foo': 'bar' } })).toBe('https://www.persiliao.com?foo=bar')
})
