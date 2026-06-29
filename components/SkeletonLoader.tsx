"use client";

import { motion } from "framer-motion";

export function HeroSkeleton() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8 sm:py-10 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="skeleton h-5 w-32" />
        <div className="skeleton h-4 w-10" />
      </div>
      <div className="flex justify-center my-3">
        <div className="skeleton h-20 w-20 rounded-full" />
      </div>
      <div className="skeleton h-28 w-40 mx-auto" />
      <div className="skeleton h-5 w-36 mx-auto mt-2" />
      <div className="skeleton h-4 w-24 mx-auto mt-1" />
      <div className="flex justify-center gap-2 mt-5">
        <div className="skeleton h-7 w-20 rounded-full" />
        <div className="skeleton h-7 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function HourlySkeleton() {
  return (
    <div className="glass-card p-4 sm:p-5">
      <div className="skeleton h-3 w-28 mb-3" />
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[72px] py-3 px-2">
            <div className="skeleton h-3 w-10" />
            <div className="skeleton h-7 w-7 rounded-full" />
            <div className="skeleton h-4 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailySkeleton() {
  return (
    <div className="glass-card p-4 sm:p-5">
      <div className="skeleton h-3 w-28 mb-2" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center py-3">
          <div className="skeleton h-4 w-10" />
          <div className="skeleton h-6 w-6 rounded-full mx-3" />
          <div className="skeleton h-3 flex-1 mx-2" />
          <div className="skeleton h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="skeleton h-3 w-20" />
            <div className="skeleton h-4 w-4" />
          </div>
          <div className="skeleton h-6 w-16 mb-2" />
          <div className="skeleton h-1 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 w-full"
    >
      <HeroSkeleton />
      <HourlySkeleton />
      <DailySkeleton />
      <DetailsSkeleton />
    </motion.div>
  );
}
