import React from 'react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PrincipleExplainer: React.FC = () => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="what-is">
        <AccordionItem value="what-is">
          <AccordionTrigger className="text-sm font-semibold">
            什么是逆序对？
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-700 space-y-2">
            <p>
              在数组中，如果 <code className="bg-gray-100 px-1 rounded">i &lt; j</code> 但
              <code className="bg-gray-100 px-1 rounded">arr[i] &gt; arr[j]</code>，则称
              <code className="bg-gray-100 px-1 rounded">(arr[i], arr[j])</code> 为一个逆序对。
            </p>
            <p className="mt-2">
              <strong>例子：</strong> 数组 <code className="bg-gray-100 px-1 rounded">[3, 1, 2]</code> 有两个逆序对：
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><code className="bg-gray-100 px-1 rounded">(3, 1)</code></li>
              <li><code className="bg-gray-100 px-1 rounded">(3, 2)</code></li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="why-merge-sort">
          <AccordionTrigger className="text-sm font-semibold">
            为什么用归并排序计算逆序对？
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-700 space-y-2">
            <p>
              暴力方法需要 O(n²) 的时间复杂度，检查所有元素对。
            </p>
            <p className="mt-2">
              归并排序利用分治思想，在合并两个已排序的子数组时，可以高效地计算跨越两个子数组的逆序对。
            </p>
            <p className="mt-2">
              <strong>时间复杂度：</strong> O(n log n)，比暴力方法快得多。
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="merge-counting">
          <AccordionTrigger className="text-sm font-semibold">
            合并时如何计算逆序对？
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-700 space-y-3">
            <p>
              当合并两个已排序的子数组时，如果左子数组的元素大于右子数组的元素，则形成逆序对。
            </p>
            <div className="bg-gray-50 p-3 rounded border border-gray-200 mt-2">
              <p className="font-mono text-xs">
                左子数组: [3, 5]<br />
                右子数组: [2, 4]<br />
                <br />
                比较 3 和 2：3 &gt; 2<br />
                → 逆序对：(3, 2)、(5, 2) = 2 个
              </p>
            </div>
            <p className="mt-2">
              关键洞察：当左指针指向的元素大于右指针指向的元素时，左子数组中从该指针到末尾的所有元素都与右指针元素形成逆序对。
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="algorithm-steps">
          <AccordionTrigger className="text-sm font-semibold">
            算法步骤
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-700 space-y-3">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>分割：</strong> 将数组递归地分成两半，直到每个子数组只有一个元素
              </li>
              <li>
                <strong>合并：</strong> 合并两个已排序的子数组，同时计算逆序对
              </li>
              <li>
                <strong>计数：</strong> 当左子数组元素 &gt; 右子数组元素时，计数所有剩余的左子数组元素
              </li>
              <li>
                <strong>返回：</strong> 返回排序后的数组和总逆序对数
              </li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="complexity">
          <AccordionTrigger className="text-sm font-semibold">
            时间和空间复杂度
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-700 space-y-2">
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p><strong>时间复杂度：</strong> O(n log n)</p>
              <p className="mt-2">
                - 分割阶段：O(log n) 层<br />
                - 每层合并：O(n) 操作<br />
                - 总计：O(n log n)
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200 mt-2">
              <p><strong>空间复杂度：</strong> O(n)</p>
              <p className="mt-2">
                需要临时数组存储合并过程中的元素
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="applications">
          <AccordionTrigger className="text-sm font-semibold">
            应用场景
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>计算数组的"乱序程度"</li>
              <li>排序算法的分析和优化</li>
              <li>数据分析中的相关性度量</li>
              <li>竞争编程和算法面试题</li>
              <li>音乐推荐系统中的相似度计算</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PrincipleExplainer;
