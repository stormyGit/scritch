/**
 * Utility type to define a GraphQL Fragment in a type safe manner
 * 
 * ***Explanations:*** 
 *   
 *  - `T extends U` makes sure that every keys in U exists in T.  
 *  - Then it simply return the `U` type you've created.  
 *    
 * The goal is just to force a compiler check on the newly created type  
 *    
 * ***Usage***:  
 *   
 * ```ts
 *  type SubResource = {
 *    id: string;
 *    title: string;
 *  }
 * 
 *  type Resource = {
 *    id: string;
 *    title: string;
 *    sub: SubResource[];
 *  }
 * 
 *  // Here we only pick id from Resource and id from SubResource
 *  type ResourceFragment = Fragment<Resource, Pick<Resource, 'id'> & { sub: Pick<SubResource, 'id'>[] }>
 * ```
 */
export type Fragment<T extends U, U> = U;
