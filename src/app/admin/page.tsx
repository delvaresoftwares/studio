'use client';

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { getContactsAction, type Contact } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, ShieldCheck, ShieldOff } from 'lucide-react';
import Logo from '@/components/logo';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, use a proper auth system. This is for demonstration.
    if (password === 'delvareadmin1212') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchContacts = async () => {
        setIsLoading(true);
        setError('');
        const result = await getContactsAction();
        if (result.contacts) {
          setContacts(result.contacts);
        } else if (result.error) {
          setError(result.error);
        }
        setIsLoading(false);
      };
      fetchContacts();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center gap-3">
              <Logo />
              <span className="font-bold text-xl">Delvare</span>
            </div>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>Enter password to access contact list</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                <ShieldCheck className="mr-2" /> Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold font-headline">Admin Panel</h1>
              <p className="text-muted-foreground">View contact form submissions.</p>
            </div>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              <ShieldOff className="mr-2"/> Logout
            </Button>
        </div>

        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        ) : error ? (
            <Alert variant="destructive">
              <AlertTitle>Error Fetching Data</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        ) : (
          <Card>
            <CardContent className="p-0">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Received</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <TableRow key={contact.id}>
                        <TableCell className="whitespace-nowrap">{contact.createdAt}</TableCell>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">
                        No contact submissions yet.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
