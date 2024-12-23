actor HealthChainRecords {
    type Patient = {
        id: Text;
        name: Text;
        age: Nat;
        medicalRecords: [Text];
    };

    var patients: [Patient] = [];

    public func addPatient(id: Text, name: Text, age: Nat): async Text {
        let newPatient = { id; name; age; medicalRecords = [] };
        patients := Array.append(patients, [newPatient]);
        return "Patient added";
    };

    public func getPatient(id: Text): async ?Patient {
        return Array.find<Patient>(patients, func (p) { p.id == id });
    };

    public func addMedicalRecord(id: Text, record: Text): async Text {
        let patientOpt = Array.find<Patient>(patients, func (p) { p.id == id });
        switch (patientOpt) {
            case (?patient) {
                let updatedPatient = { patient with medicalRecords = Array.append(patient.medicalRecords, [record]) };
                patients := Array.map<Patient>(patients, func (p) {
                    if (p.id == id) updatedPatient else p
                });
                return "Medical record added";
            };
            case null {
                return "Patient not found";
            };
        }
    };
}
