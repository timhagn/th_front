/**
 * Strips the WordPress and Paragraph Tags from a given Drupal Node's Body.
 *
 * @param drupalText String   The given Drupal Text.
 *
 * @return String             The matched inner Text.
 */
export const stripGutenbergTags = drupalText => {
  const gutenbergRegEx = /.*<p>(.*)<\/p>.*/
  const result = drupalText.match(gutenbergRegEx);
  if (Array.isArray(result) && result[1]) {
    return result[1]
  }
  return ''
}