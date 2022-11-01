import User from "@/types/User";

class LocalDataService {
  getData(name: string): User[] {
    const data: string | null = localStorage.getItem(name);
    return JSON.parse(data);
  }

  setData(name: string, data: User[]): void {
    const convertData: string = JSON.stringify(data);
    localStorage.setItem(name, convertData);
  }
}

export default new LocalDataService();
