import { buildRequestUrl } from './../src/util'

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
