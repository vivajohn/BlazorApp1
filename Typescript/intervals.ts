// Manages the spaced repetition values: changes the next playback time as appropriate
export class Intervals {
  oneMinute = 60 * 1000;
  oneHour = 60 * this.oneMinute;
  oneDay = 24 * this.oneHour;
  intervals = [
      // Pimsleur's intervals:
      // 5 seconds, 25 seconds, 2 minutes, 10 minutes, 1 hour, 5 hours, 1 day, 5 days, 25 days, 4 months, 2 years
      // The first two are not realistic in this context, so they are modified. The last two don't give much
      // practice, so they are changed. '2 days' also added to give more practice.
      30 * 1000,
      this.oneMinute,
      2 * this.oneMinute,
      10 * this.oneMinute,
      this.oneHour,
      5 * this.oneHour,
      this.oneDay,
      2 * this.oneDay,
      5 * this.oneDay,
      25 * this.oneDay,
      60 * this.oneDay,
      120 * this.oneDay,
      180 * this.oneDay
  ];
  maxIndex = this.intervals.length - 1;
  fiveHourInterval = this.intervals.findIndex(x => x === this.oneHour * 5);
  oneDayInterval = this.intervals.findIndex(x => x === this.oneDay);

  // Get the next intervals index and date depending on whether the user
  // successfully answered the prompt or not.
  next(currentIndex: number, success: boolean): { index: number, date: number } {
    return success ? this.setSuccess(currentIndex) : this.setFailure(currentIndex);
  }

  private setSuccess(currentIndex: number): { index: number, date: number } {
    if (currentIndex < this.maxIndex) currentIndex++;
    return { index: currentIndex, date: Date.now() + this.intervals[currentIndex] };
  }

  private setFailure(currentIndex: number): { index: number, date: number } {
    if (currentIndex > 0) {
      if (currentIndex > this.oneDayInterval) {
        // If the next try is far in the future, go back to one day
        currentIndex = this.oneDayInterval;
      } else {
        currentIndex--;
      }
    }
    return { index: currentIndex, date: Date.now() + this.intervals[currentIndex] };
  }
}
