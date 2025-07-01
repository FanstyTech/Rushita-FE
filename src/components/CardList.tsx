import React from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { Home } from 'lucide-react';

const popularContent = [
    {
        id: 1,
        title: "JavaScript Tutorial",
        description: "React Hooks Explained",

        icons: Home,
        count: 4300,
    },
    {
        id: 2,
        title: "Tech Trends 2025",
        description: "React Hooks Explained",

        icons: Home,
        color: "blue-500",

        count: 3200,
    },
    {
        id: 3,
        title: "The Future of AI",
        description: "React Hooks Explained",

        icons: Home,
        color: "green-500",
        count: 2400,
    },
    {
        id: 4,
        title: "React Hooks Explained",
        description: "React Hooks Explained",

        icons: Home,
        color: "red-500",
        count: 1500,
    },
    {
        id: 5,
        title: "Image Generation with AI",
        description: "React Hooks Explained",

        icons: Home,
        color: "pink-500",
        count: 1200,
    },
];

function CardList() {
    return (
        <div className=''>
            <h1 className='text-lg font-medium mb-6'>Recent Activity</h1>
            <div className='flex flex-col gap-2'>
                {popularContent.map(item => (
                    <Card key={item.id} className='flex-row border-0   shadow-none items-center justify-between gap-4 p-2'>
                        <div className={`w-10 h-10 rounded-sm relative overflow-hidden bg-${item.color}/10    flex justify-center items-center `}  >
                            <item.icons className={`text-${item.color}`} />
                        </div>
                        <CardContent className='flex-1 p-0'>
                            <CardTitle className='text-sm flex flex-col gap-2 '>
                                <h1>{item.title}</h1>
                                <p className='text-xs text-muted-foreground'>{item.description}</p>
                            </CardTitle>
                        </CardContent>
                        <CardFooter className='p-0'>
                        </CardFooter>
                    </Card>
                ))} </div>
        </div >
    )
}

export default CardList