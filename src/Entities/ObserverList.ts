/**
 * A generic implementation of the Observer pattern.
 * Maintains a list of observer functions that can be notified with a message.
 *
 * @typeParam T - The type of message that will be passed to observers
 */
export class ObserverList<T> {
  private observers: ((msg: T) => void)[] = [];

  /**
   * Notifies all observers by calling them with the provided message
   * @param msg - The message to send to all observers
   */
  public notify = (msg: T) => {
    this.observers.forEach((obs) => {
      obs(msg);
    });
  };

  /**
   * Adds a new observer function to the list
   * @param obs - The observer function to add
   */
  public add = (obs: (msg: T) => void) => {
    this.observers.push(obs);
  };

  /**
   * Removes an observer from the list
   * @param obs - The observer function to remove
   */
  public remove = (obs: (msg: T) => void) => {
    const index = this.observers.indexOf(obs);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  };

  /**
   * Removes all observers from the list
   */
  public clear = () => {
    this.observers = [];
  };
}
