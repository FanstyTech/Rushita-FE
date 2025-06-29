'use client';

import * as React from 'react';
import { Edit2, Flag, MessageSquare, TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import RotateImage from './RotateImage';
import CardDiv from './CardDiv';

export const description = 'A donut chart with text';

const chartData = [
  { browser: 'chrome', visitors: 75, fill: 'var(--color-primary)' },
  { browser: 'mo', visitors: 25, fill: '#F2F2F2' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ChartPie() {
  const totalVisitors = 75;
  const [innerRadius, setInnerRadius] = React.useState(85);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 350) setInnerRadius(50);
      else if (width < 768) setInnerRadius(70);
      else setInnerRadius(85);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Card className=" flex-col  border-0 gap-0  shadow-none p-0 ">
      <CardContent className="flex-1 pb-0 px-0 relative">
        <div className="xsm:block hidden rounded-full absolute lg:-top-8 lg:left-0 left-10 top-12 md:top-5 md:left-5  lg:w-80 lg:h-80 md:w-72 md:h-72 w-60 h-60 border-2 border-dashed border-black/5">
          <RotateImage rotate={0} image="/images/Ellipse7.png" />
        </div>
        <div className="xsm:block hidden rounded-full absolute lg:-top-8 lg:left-0 left-10 top-12 md:top-5 md:left-5  lg:w-80 lg:h-80 md:w-72 md:h-72 w-60 h-60 border-2 lg:scale-150 scale-125 border-dashed border-black/5">
          <RotateImage rotate={-130} image="/images/image.png" />

          <RotateImage rotate={70} image="/images/image(1).png" />
          <CardDiv
            bgcolor="bg-[#008EFF]"
            rotate={45}
            Icon={Edit2}
            className="xl:scale-90"
            title="لديك مراجعة يوم الثلاثاء القادم، نتمنى أن تكون بخير"
            doctorname="-دكتور وليد"
          />
          <CardDiv
            bgcolor="bg-[#FABB18]"
            rotate={150}
            className="top-7 xl:scale-90 "
            Icon={Flag}
            title="لديك مراجعة يوم الثلاثاء القادم، نتمنى أن تكون بخير"
            doctorname="-دكتور وليد"
          />
          <CardDiv
            bgcolor="bg-[#45C646]"
            rotate={230}
            className="xl:right-10 md:right-3 right-16 xl:scale-90  "
            Icon={MessageSquare}
            title="لديك مراجعة يوم الثلاثاء القادم، نتمنى أن تكون بخير"
            doctorname="-دكتور وليد"
          />
        </div>

        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square  lg:max-h-[250px] lg:min-h-32 xxs:min-h-auto"
        >
          <PieChart>
            <ChartTooltip cursor={false} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={innerRadius}
              strokeWidth={10}
              outerRadius={innerRadius + 15}
              stroke="none"
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-primary font-black  md:text-4xl text-sm"
              >
                {totalVisitors.toLocaleString()}%
              </text>
              <text
                x="50%"
                y="59%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-black/70 block mt-2  font-medium  line-clamp-1 sm:text-sm text-xs"
              >
                توفير وقت مهدر
              </text>
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm xxs:block hidden">
        <div className="flex items-center gap-2 leading-none font-medium">
          <TrendingUp className="h-4 w-4 opacity-0" />
        </div>
        <div className="text-muted-foreground leading-none opacity-0">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
