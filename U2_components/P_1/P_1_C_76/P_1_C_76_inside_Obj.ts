export interface IProps {

  /**

   * Controls the visibility of the container.

   * Corresponds to behavior B-276 (Show/Hide).

   */

  visible?: boolean;

  /**

   * The HTML tag to use for the container.

   * Based on CL_18 (Container).

   * @default 'div'

   */

  tag?: string;

}