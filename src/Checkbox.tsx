import { useState } from "react";
import data from "./assets/data.json";
import { IJSONdata, ISUBDEP } from "./assets/Post";
const CheckboxInput = () => {
    const [department, setDepartment] = useState<IJSONdata[]>([]);
    const [subDepartments, setSubDepartment] = useState<ISUBDEP[]>([]);

    const handleDepChange = (dep: IJSONdata) => {
        if (department.includes(dep)) {
            setDepartment(department.filter((depa) => depa !== dep));
        } else {
            setDepartment([...department, dep]);
        }

        if (!department.includes(dep)) {
            setSubDepartment([...subDepartments, ...dep.sub_departments]);
        } else {
            setSubDepartment(
                subDepartments.filter((subDep) => !dep.sub_departments.includes(subDep))
            );
        }
    };

    const handleSubDepChange = (subDep: ISUBDEP) => {
        if (subDepartments.includes(subDep)) {
            setSubDepartment(subDepartments.filter((subDepa) => subDepa !== subDep));
        } else {
            setSubDepartment([...subDepartments, subDep]);
        }

        const parentDepartment = data.find(
            (dep) => dep.department === subDep.parent
        );
        if (
            !subDepartments.includes(subDep) &&
            parentDepartment?.sub_departments.every(
                (subDepa) => subDepartments.includes(subDepa) || subDepa === subDep
            )
        ) {
            setDepartment([...department, parentDepartment]);
        } else if (
            subDepartments.includes(subDep) &&
            parentDepartment &&
            department.includes(parentDepartment)
        ) {
            setDepartment(department.filter((dep) => dep !== parentDepartment));
        }
    };

    return (
        <>
            {data.map((dep) => (
                <div key={dep.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={department.includes(dep)}
                            onChange={() => handleDepChange(dep)}
                        />
                        {dep.department}
                    </label>
                    <ul>
                        {dep.sub_departments.map((sub, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={subDepartments.includes(sub)}
                                        onChange={() => handleSubDepChange(sub)}
                                    />
                                    {sub.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default CheckboxInput;
