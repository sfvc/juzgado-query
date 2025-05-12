export interface IUserAudit {
  id: number;
  nombre: string;
  dni: string;
  juzgado_id: number;
  username: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IAuditoria {
  id: number;
  user_type: string | null;
  user_id: number | null;
  event: string;
  auditable_type: string;
  auditable_id: number;
  old_values: string;
  new_values: string;
  url: string | null;
  ip_address: string | null;
  user_agent: string | null;
  tags: string | null;
  created_at: string;
  updated_at: string;
  user: IUserAudit | null;
}
