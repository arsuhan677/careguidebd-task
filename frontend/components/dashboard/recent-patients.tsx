import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RecentPatientsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export function RecentPatients({ data }: RecentPatientsProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-none shadow-sm ring-1 ring-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Recent Patients</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center text-sm text-gray-500">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm ring-1 ring-gray-200 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead className="text-right">Doctor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((pat, idx) => (
                <TableRow key={pat._id || idx}>
                  <TableCell className="font-medium text-gray-900">
                    {pat.name}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {pat.age} / {pat.gender}
                  </TableCell>
                  <TableCell className="text-right text-gray-500">
                    {pat.doctor?.name || 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
