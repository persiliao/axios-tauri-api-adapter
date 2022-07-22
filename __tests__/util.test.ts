import { generateUrl } from './../src/util'

test('only baseURL', () => {
  expect(generateUrl({ baseURL: 'https://www.persiliao.com' })).toBe('https://www.persiliao.com')
})

test('only url', () => {
  expect(generateUrl({ url: 'https://www.persiliao.com' })).toBe('https://www.persiliao.com')
})

test('only url with params', () => {
  expect(generateUrl({ url: 'https://www.persiliao.com?foo=bar' })).toBe('https://www.persiliao.com?foo=bar')
})

test('only url with params & config.params', () => {
  expect(generateUrl({ url: 'https://www.persiliao.com?foo=bar', params: { 'name': 'PersiLiao'} })).toBe('https://www.persiliao.com?foo=bar&name=PersiLiao')
})

test('only url & params', () => {
  expect(generateUrl({ url: 'https://www.persiliao.com', params: { 'foo': 'bar' } })).toBe('https://www.persiliao.com?foo=bar')
})
