export class Contact {
    constructor(public contactId: string, public contactName: string, public phoneNumber: string, public email: string,
        public groupType: string, public address: string, public photoFile: File
    ) { }
}
