import { useEffect, useState } from "react";
import { Users, Briefcase, DollarSign, Trophy } from "lucide-react";

import StatCard from "@/components/StatCard";

import { getEmployees, type Employee } from "@/lib/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  }

  const totalEmployees = employees.length;

  const totalSalary = employees.reduce(
    (acc, employee) => acc + employee.salary,
    0,
  );

  const averageSalary =
    totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  const topEmployees = [...employees]
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          label="Total Employees"
          value={totalEmployees}
          icon={<Users size={20} />}
          color="indigo"
        />

        <StatCard
          label="Total Salary"
          value={`$${totalSalary.toLocaleString()}`}
          icon={<DollarSign size={20} />}
          color="green"
        />

        <StatCard
          label="Average Salary"
          value={`$${averageSalary.toLocaleString()}`}
          icon={<Briefcase size={20} />}
          color="amber"
        />
      </div>

      {/* Highest Paid Employees */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={18} className="text-amber-500" />

          <h2 className="font-semibold text-gray-900">
            Highest Paid Employees
          </h2>
        </div>

        <div className="space-y-3">
          {topEmployees.length > 0 ? (
            topEmployees.map((employee, index) => (
              <div
                key={employee.id}
                className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    #{index + 1} {employee.name}
                  </p>

                  <p className="text-sm text-gray-500">{employee.job_title}</p>
                </div>

                <p className="font-semibold text-gray-900">
                  ${employee.salary.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No employees found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
