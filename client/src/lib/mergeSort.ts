/**
 * Merge Sort Inverse Pairs Algorithm Implementation
 * Counts the number of inverse pairs while sorting the array
 */

export interface MergeSortState {
  step: number;
  array: number[];
  inversePairs: number;
  explanation: string;
  isComplete: boolean;
  highlightIndices: number[];
  mergeRanges: Array<{ left: number; right: number; isMerging: boolean }>;
  comparedIndices: Array<{ i: number; j: number }>;
  sortedRanges: Array<{ left: number; right: number }>;
}

export class MergeSortInversePairs {
  private states: MergeSortState[] = [];
  private originalArray: number[];
  private inversePairs: number = 0;

  constructor(array: number[]) {
    this.originalArray = [...array];
  }

  /**
   * Run merge sort and record all states for animation
   */
  run(): MergeSortState[] {
    const array = [...this.originalArray];
    this.inversePairs = 0;
    this.states = [];

    // Record initial state
    this.recordState(
      array,
      0,
      '初始化：准备对数组进行归并排序，同时计算逆序对数量。',
      [],
      [],
      [],
      [{left: 0, right: array.length - 1}]
    );

    // Perform merge sort
    this.mergeSort(array, 0, array.length - 1);

    // Record final state
    this.recordState(
      array,
      this.inversePairs,
      `排序完成！总共找到 ${this.inversePairs} 个逆序对。`,
      [],
      [],
      [],
      [{left: 0, right: array.length - 1}]
    );

    return this.states;
  }

  private mergeSort(array: number[], left: number, right: number): void {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Record dividing state
    this.recordState(
      array,
      this.inversePairs,
      `分割阶段：将数组分为 [${left}, ${mid}] 和 [${mid + 1}, ${right}]`,
      [],
      [{left, right: mid, isMerging: false}, {left: mid + 1, right, isMerging: false}],
      [],
      []
    );

    // Recursively sort left half
    this.mergeSort(array, left, mid);

    // Recursively sort right half
    this.mergeSort(array, mid + 1, right);

    // Merge and count inverse pairs
    this.merge(array, left, mid, right);
  }

  private merge(array: number[], left: number, mid: number, right: number): void {
    const temp: number[] = [];
    let i = left;
    let j = mid + 1;
    let k = 0;

    // Record merge start
    this.recordState(
      array,
      this.inversePairs,
      `开始合并 [${left}, ${mid}] 和 [${mid + 1}, ${right}]`,
      [],
      [{left, right: mid, isMerging: true}, {left: mid + 1, right, isMerging: true}],
      [],
      []
    );

    // Merge two sorted subarrays
    while (i <= mid && j <= right) {
      if (array[i] <= array[j]) {
        temp[k++] = array[i++];
      } else {
        // Found inverse pairs: elements from left half are greater than element from right half
        const inversePairCount = mid - i + 1;
        this.inversePairs += inversePairCount;

        temp[k++] = array[j++];

        // Record inverse pair detection
        this.recordState(
          array,
          this.inversePairs,
          `检测到 ${inversePairCount} 个逆序对：array[${i}...${mid}] > array[${j - 1}]`,
          [i, j - 1],
          [{left, right: mid, isMerging: true}, {left: mid + 1, right, isMerging: true}],
          [{i, j: j - 1}],
          []
        );
      }
    }

    // Copy remaining elements
    while (i <= mid) {
      temp[k++] = array[i++];
    }
    while (j <= right) {
      temp[k++] = array[j++];
    }

    // Copy back to original array
    for (let i = left, k = 0; i <= right; i++, k++) {
      array[i] = temp[k];
    }

    // Record merge complete
    this.recordState(
      array,
      this.inversePairs,
      `合并完成：[${left}, ${right}] 已排序`,
      [],
      [],
      [],
      [{left, right}]
    );
  }

  private recordState(
    array: number[],
    inversePairs: number,
    explanation: string,
    highlightIndices: number[] = [],
    mergeRanges: Array<{ left: number; right: number; isMerging: boolean }> = [],
    comparedIndices: Array<{ i: number; j: number }> = [],
    sortedRanges: Array<{ left: number; right: number }> = []
  ): void {
    this.states.push({
      step: this.states.length,
      array: [...array],
      inversePairs,
      explanation,
      isComplete: this.states.length > 0 && array.every((val, idx) => idx === 0 || val >= array[idx - 1]),
      highlightIndices,
      mergeRanges,
      comparedIndices,
      sortedRanges,
    });
  }

  getStates(): MergeSortState[] {
    return this.states;
  }

  getStateCount(): number {
    return this.states.length;
  }

  getInversePairs(): number {
    return this.inversePairs;
  }
}

/**
 * Generate a random array for demonstration
 */
export function generateRandomArray(length: number, maxValue: number = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * maxValue) + 1);
}

/**
 * Count inverse pairs using brute force (for verification)
 */
export function countInversePairsBruteForce(array: number[]): number {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        count++;
      }
    }
  }
  return count;
}
