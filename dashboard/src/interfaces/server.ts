export interface Server {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: Array<string>;
  active: boolean;
}
