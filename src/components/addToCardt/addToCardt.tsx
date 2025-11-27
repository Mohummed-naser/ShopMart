import React from 'react'
import { CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { HeartIcon } from 'lucide-react';

export default function AddToCardt() {
  return (
    <CardFooter className="gap-2 mt-2">
      <Button className="grow">Add to card</Button>
      <HeartIcon></HeartIcon>
    </CardFooter>
  );
}
