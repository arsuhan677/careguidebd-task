import { IPatientByDoctorStats } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PatientsByDoctorProps {
  data: IPatientByDoctorStats[];
}

export function PatientsByDoctor({ data }: PatientsByDoctorProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-none shadow-sm ring-1 ring-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Patients by Doctor</CardTitle>
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
        <CardTitle className="text-lg">Patients by Doctor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor Name</TableHead>
                <TableHead className="text-right">Patients</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((stat, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-gray-900">
                    {stat.doctorName}
                  </TableCell>
                  <TableCell className="text-right text-gray-500">
                    {stat.patientCount}
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
