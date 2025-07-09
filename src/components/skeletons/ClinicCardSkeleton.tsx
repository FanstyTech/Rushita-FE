import { Card, CardContent } from "../ui/card";

export default function ClinicCardSkeleton() {
  return (
    <Card className=" rounded-xl shadow-sm p-6">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
            <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
            <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
