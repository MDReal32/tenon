export interface WikilinkIndex {
  stems: Map<string, string[]>;
  paths: Map<string, string>;
  folders: Set<string>;
}
